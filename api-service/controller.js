const User = require('../database/models/User');
const sendEmail = require('../mailer');

const controller = async (req, res, next) => {
  try {
    const { email } = req.body;

    await User.create(email);

    const welcomeMessage = {
      title: 'Welcome to Cope Notes',
      content: 'You have successfully subscribed to Cope Notes, A new message will be sent to your email every minute',
    };

    sendEmail(email, welcomeMessage);

    return res.send(welcomeMessage.content);
  } catch (error) {
    return next(error);
  }
};

module.exports = controller;
