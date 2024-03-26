const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {

    console.log("hello i am in main sender")

    let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
      }
  })
console.log("process.env.MAIL_USER",process.env.MAIL_USER)
console.log("process.env.MAIL_PASSWORD",process.env.MAIL_PASSWORD)


  let info = await transporter.sendMail({
      from: 'StudyNotion || CodeHelp - by Babbar',
      to:`${email}`,
      subject: `${title}`,
      html: `${body}`,
  })
  console.log("info is ",info)
  return info;
    }catch(err){
        console.log(err);
        console.log("error is occur when the email is try to send")
        res.json({
            msg:"error is occur when the email is try to send"

        })
    }
}
module.exports = mailSender;