
const nodemailer = require("nodemailer");


async function main() {

  let testAccount = await nodemailer.createTestAccount();

  
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "hr.woocite@gmail.com", // generated ethereal user
      pass: "kushal7629", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "hr.woocite@gmail.com", // sender address
    to: "chauhankushal2312@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);