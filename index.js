var sendMail = {
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGrid_API_KEY);
const msg = {
  to: 'chipmunktravel.help@gmail.com',
  from: 'chipmunktravel.help@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg, (error, result) => {
    if (error) {
      console.log(error)
      console.log("girl this dont work")
      console.log(process.env.SENDGRID_API_KEY)
    }
    else {
      //Celebrate
    }
  });
}

module.exports = sendMail;
