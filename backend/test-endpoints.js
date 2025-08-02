const http = require('http');

const BASE_URL = 'http://localhost:5000';
let authToken = '';

function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: parsedBody
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testHealthCheck() {
  console.log('\n🏥 Testing Health Check...');
  try {
    const response = await makeRequest('GET', '/health');
    console.log(`✅ Health Check: ${response.status} - ${JSON.stringify(response.data)}`);
    return true;
  } catch (error) {
    console.log(`❌ Health Check Failed: ${error.message}`);
    return false;
  }
}

async function testRegister() {
  console.log('\n🔐 Testing User Registration...');
  try {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await makeRequest('POST', '/api/auth/register', userData);
    if (response.status === 201) {
      authToken = response.data.token;
      console.log(`✅ Registration: ${response.status} - User created successfully`);
      console.log(`   Token: ${authToken.substring(0, 50)}...`);
      return true;
    } else {
      console.log(`❌ Registration: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Registration Failed: ${error.message}`);
    return false;
  }
}

async function testLogin() {
  console.log('\n🔑 Testing User Login...');
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await makeRequest('POST', '/api/auth/login', loginData);
    if (response.status === 200) {
      authToken = response.data.token;
      console.log(`✅ Login: ${response.status} - Login successful`);
      console.log(`   Token: ${authToken.substring(0, 50)}...`);
      return true;
    } else {
      console.log(`❌ Login: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Login Failed: ${error.message}`);
    return false;
  }
}

async function testAddItem() {
  console.log('\n📦 Testing Add Item...');
  try {
    const itemData = {
      name: 'Organic Milk',
      type: 'grocery',
      quantity: 2,
      expiryDate: '2024-01-15',
      notes: 'Whole milk from local farm',
      imageUrl: 'https://example.com/milk.jpg'
    };
    const response = await makeRequest('POST', '/api/items', itemData, {
      'Authorization': `Bearer ${authToken}`
    });
    if (response.status === 201) {
      console.log(`✅ Add Item: ${response.status} - Item created successfully`);
      console.log(`   Item ID: ${response.data._id}`);
      return response.data._id;
    } else {
      console.log(`❌ Add Item: ${response.status} - ${JSON.stringify(response.data)}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Add Item Failed: ${error.message}`);
    return null;
  }
}

async function testGetItems() {
  console.log('\n📋 Testing Get All Items...');
  try {
    const response = await makeRequest('GET', '/api/items', null, {
      'Authorization': `Bearer ${authToken}`
    });
    if (response.status === 200) {
      console.log(`✅ Get Items: ${response.status} - Retrieved ${response.data.length} items`);
      return true;
    } else {
      console.log(`❌ Get Items: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Get Items Failed: ${error.message}`);
    return false;
  }
}

async function testGetExpiringItems() {
  console.log('\n⏰ Testing Get Expiring Items...');
  try {
    const response = await makeRequest('GET', '/api/items/expiring', null, {
      'Authorization': `Bearer ${authToken}`
    });
    if (response.status === 200) {
      console.log(`✅ Get Expiring Items: ${response.status} - Retrieved ${response.data.length} expiring items`);
      return true;
    } else {
      console.log(`❌ Get Expiring Items: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Get Expiring Items Failed: ${error.message}`);
    return null;
  }
}

async function testUpdateItem(itemId) {
  console.log('\n✏️ Testing Update Item...');
  try {
    const updateData = {
      name: 'Organic Milk Updated',
      type: 'grocery',
      quantity: 3,
      expiryDate: '2024-01-20',
      notes: 'Updated notes',
      imageUrl: 'https://example.com/new-milk.jpg'
    };
    const response = await makeRequest('PUT', `/api/items/${itemId}`, updateData, {
      'Authorization': `Bearer ${authToken}`
    });
    if (response.status === 200) {
      console.log(`✅ Update Item: ${response.status} - Item updated successfully`);
      return true;
    } else {
      console.log(`❌ Update Item: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Update Item Failed: ${error.message}`);
    return false;
  }
}

async function testDeleteItem(itemId) {
  console.log('\n🗑️ Testing Delete Item...');
  try {
    const response = await makeRequest('DELETE', `/api/items/${itemId}`, null, {
      'Authorization': `Bearer ${authToken}`
    });
    if (response.status === 200) {
      console.log(`✅ Delete Item: ${response.status} - Item deleted successfully`);
      return true;
    } else {
      console.log(`❌ Delete Item: ${response.status} - ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Delete Item Failed: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting ByteCart+ API Tests...\n');
  
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    console.log('❌ Server is not running. Please start the server first.');
    return;
  }

  const registerOk = await testRegister();
  
  const loginOk = await testLogin();
  
  if (!registerOk && !loginOk) {
    console.log('❌ Authentication tests failed. Cannot proceed with item tests.');
    return;
  }

  const itemId = await testAddItem();
  
  await testGetItems();
  
  await testGetExpiringItems();
  
  if (itemId) {
    await testUpdateItem(itemId);
  }
  
  if (itemId) {
    await testDeleteItem(itemId);
  }

  console.log('\n🎉 All tests completed!');
}

runAllTests().catch(console.error); 