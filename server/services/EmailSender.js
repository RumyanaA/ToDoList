var nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
var logger = require('./LoggingService.js');
class EmailSender{
    static async sendEmail(mailData){
        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
              user: 'test.test19977@yahoo.com',
              pass: 'njseprusowflkyow'
            }
          });
          var mailOptions = {
            from: 'test.test19977@yahoo.com',
            to: mailData.to,
            subject: mailData.subject,
            text: mailData.text,
            html: mailData.html
          };
          try{
           var info=await transporter.sendMail(mailOptions);
           if(info.accepted.length==1){
           return 'Email sent';
           }else{
               return '-1';
           }
          }catch(e){
            logger.error(e.message);

          }
    }
}
module.exports = EmailSender;
