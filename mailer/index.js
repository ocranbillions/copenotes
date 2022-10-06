const nodemailer = require('nodemailer');

const sendEmail = async (toEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.APP_SPECIFIC_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Cope Notes" <${process.env.GOOGLE_EMAIL}>`,
      to: toEmail,
      subject: message.title,
      html: `<div>${message.content}</div>`,
    });
    console.log('Message sent: ', info.response);

    return info.response;
  } catch (error) {
    console.log(`Error sending message to ${toEmail}`);
    return error;
  }
};

module.exports = sendEmail;
