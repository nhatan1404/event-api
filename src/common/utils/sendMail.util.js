import nodemailer from 'nodemailer';

export default async function sendMail(
  to,
  text = '',
  html,
  subject = 'Thông báo đăng ký sự kiện',
  from = process.env.EMAIL,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from,
    to,
    text,
    subject,
    html,
  });

  // console.log('Message sent: %s', info.messageId);
}
