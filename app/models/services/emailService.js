var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetingsystemmailer@gmail.com',
        pass: 'SanServices01$'
    }
});

async function sendEmail(data)
{
    // data: {
    //     to: 'someonr@mail.com',
    //     subject : 'subject',
    //     text : "body"
    // }
    var mailOptions = {
        from: 'silverpop@sanservices.hn',
        to: data.to,
        subject: data.subject,
        text: data.body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
            console.log(error);
        }
        else
        {
            console.log('Email sent: ' + info.response);
        }
    });
    return true;
}

module.exports = 
{
    sendEmail
}