const User = require('../database/models/User');
const mailer = require('../mailer');

const controller = async (req, res, next) => {
  try {
    const { email } = req.body;

    await User.create(email);

    const message = {
      title: 'Welcome to Cope Notes',
      content: 'You have successfully subscribed to Cope Notes, A new message will be sent to your email every minute',
    };

    mailer(email, message);

    return res.send('Welcome to Cope Notes');
  } catch (error) {
    return next(error);
  }
};

module.exports = controller;
