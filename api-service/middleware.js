const User = require('../database/models/User');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const inValidInput = !email || !email.match(/[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/);

  if (inValidInput) {
    return res.status(400).json({ error: 'Please submit a vaild email' });
  }

  const [user] = await User.find(email.trim().toLowerCase());

  if (user) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  return next();
};

module.exports = validateEmail;
