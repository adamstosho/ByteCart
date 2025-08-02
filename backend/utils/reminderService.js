const Item = require('../models/Item');
const User = require('../models/User');
const { sendReminderEmail } = require('./emailService');

const checkExpiringItems = async () => {
  try {
    const today = new Date();
    const twoDaysFromNow = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));

    const expiringItems = await Item.find({
      expiryDate: {
        $gte: today,
        $lte: twoDaysFromNow
      }
    }).populate('userId', 'name email');

    const itemsByUser = {};
    expiringItems.forEach(item => {
      const userId = item.userId._id.toString();
      if (!itemsByUser[userId]) {
        itemsByUser[userId] = {
          user: item.userId,
          items: []
        };
      }
      itemsByUser[userId].items.push(item);
    });

    for (const userId in itemsByUser) {
      const { user, items } = itemsByUser[userId];
      await sendReminderEmail(user.email, user.name, items);
    }

    console.log(`Sent ${Object.keys(itemsByUser).length} reminder emails`);
  } catch (error) {
    console.error('Error checking expiring items:', error);
  }
};

module.exports = { checkExpiringItems }; 