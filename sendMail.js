const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function companionEmailSend(email, username) {
  const message = {
  to : email,
  from : "chipmunktravel.help@gmail.com",
  message : "just added you on to a trip. Click this link to view",
  html: "<p> You have been invited on a trip. Click this <a href='http://localhost:3000/user/signin'> link </a> to view </p>",
  subject : username + " wants to go on holiday. Click to join!",

}
sgMail
  .send(message, (error, result) => {
    if (error) {

      console.log(error.response.body.errors)
      console.log(email)
      console.log(message)
      console.log("girl this dont work")
    }
    else {
      //Celebrate
    }
  });
}

module.exports = {
  companionEmailSend: companionEmailSend
}
