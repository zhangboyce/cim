var nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
    host: 'mail.ccegroup.cn',
    port: 25,
    secure: false, // use SSL
    auth: {
        user: 'Naodong@ccegroup.cn',
        pass: 'abcd@1234'
    }
});

module.exports = {
    sendMail: function (to, subject, html) {
        return new Promise(function (resolve, reject) {
            mail.sendMail({
                sender: 'Naodong@ccegroup.cn',
                to: to,
                subject: subject,
                html: html
            }, function (err, res) {
                if(err) {
                    reject(err);
                }else {
                    resolve(res);
                }
            });
        });
    }
};
