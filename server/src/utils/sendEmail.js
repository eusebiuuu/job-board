const sgMail = require('@sendgrid/mail');
const emailMessages = require('./emailMessages');

const sendEmail = async (req, name, email, token, type, field) => {
  const forwardedHost = req.get('host');
  const forwardedProtocol = req.get('x-forwarded-proto') || 'http';
  const origin = `${forwardedProtocol}://${forwardedHost}`;
  // console.log(origin);

  const message = emailMessages[field];
  const uri = `${origin}/${message.link}?token=${token}&email=${email}&type=${type}`;
  const link = `<a href=${uri}>here</a>`;
  const htmlMessage = `<p>${message.msg} ${link}.</p>`;
  const htmlBody = `<h4>Hello ${name}!<h4>${htmlMessage}`;
  const subject = message.title;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emailContent = {
    from: 'eusebiu.rimboi04@gmail.com',
    to: email,
    subject: subject,
    html: htmlBody,
  };
  const info = await sgMail.send(emailContent);
  // console.log(info);
}

module.exports = {
  sendEmail,
}