const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hr.woocite@gmail.com',
        pass: 'kushal7629'
    }
});
  
let mailDetails = {
    from: 'hr.woocite@gmail.com',
    to: 'chauhankushal2312@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});