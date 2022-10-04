const mailer = require('./mailer');
const { addToSubscribers } = require('./database');

const controller = async (req, res, next) => {
  try {
    const { email } = req.body;

    await addToSubscribers(email);

    const message = {
      title: 'Welcome to Cope Notes',
      content: 'You have successfully subscribed to Cope Notes... Every minute a new message will be sent to your email',
    };
    mailer(email, message);

    return res.send('Welcome to Cope Notes');
  } catch (error) {
    return next(error);
  }
};

module.exports = controller;
