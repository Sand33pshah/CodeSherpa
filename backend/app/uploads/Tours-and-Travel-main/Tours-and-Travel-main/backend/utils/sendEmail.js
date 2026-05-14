const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'user',
      pass: process.env.SMTP_PASSWORD || 'password',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Tours & Travel'} <${process.env.FROM_EMAIL || 'noreply@tours.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Skip sending if mock config is used
  if (!process.env.SMTP_EMAIL) {
    console.log('Email not sent: SMTP credentials not configured.');
    return;
  }

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
