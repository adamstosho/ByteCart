const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = async (userEmail, userName, expiringItems) => {
  try {
    const itemsList = expiringItems.map(item => 
      `- ${item.name} (${item.type}) - Expires: ${new Date(item.expiryDate).toLocaleDateString()}`
    ).join('\n');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: 'ByteCart+ - Items Expiring Soon!',
      html: `
        <h2>Hello ${userName}!</h2>
        <p>You have items that are expiring soon:</p>
        <ul>
          ${expiringItems.map(item => 
            `<li><strong>${item.name}</strong> (${item.type}) - Expires: ${new Date(item.expiryDate).toLocaleDateString()}</li>`
          ).join('')}
        </ul>
        <p>Visit your dashboard to manage these items: <a href="${process.env.CLIENT_URL}">${process.env.CLIENT_URL}</a></p>
        <p>Best regards,<br>ByteCart+ Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendReminderEmail }; 