import twilio from 'twilio';

const sendSMS = (to, body) => {
  const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  return client.messages.create({
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body,
  });
};

export default sendSMS;
