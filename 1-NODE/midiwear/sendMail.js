var nodemailer = require('nodemailer');
import {get} from '../config'
var email =get("staging").email;
// console.log(email)

export const sendmail = async(from,to,subject,text)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email.emailId,
          pass: email.password
          
        }
      });
      let mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: text, // plain text body
        attachments: [
            {
                filename: 'invoice.pdf',           
                  path: ('./output/Invoice.pdf'),         
                   contentType: 'application/pdf'        }
        ]
    };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return ture
        }
      });
      
}