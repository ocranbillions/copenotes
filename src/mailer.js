const nodemailer = require('nodemailer');

const mailer = async (toEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.APP_SPECIFIC_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Cope Notes" <sammiestt@gmail.com>',
    to: toEmail,
    subject: message.title,
    html: `<div>${message.content}</div>`,
  });

  console.log('Message sent: ', info.messageId);

  return 'Ok';
};

// export default mailer;
module.exports = mailer;
