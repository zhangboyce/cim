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

//var mail = nodemailer.createTransport({
//    host: 'smtp.tom.com',
//    port: 25,
//    secure: false, // use SSL
//    auth: {
//        user: 'letmetest@tom.com',
//        pass: 'letmetest'
//    }
//});

//mail.sendMail(
//    {
//        sender:'letustest@sohu.com', //发送邮件的地址
//        to:'aoliwen521@126.com', //发给谁
//        subject:'测试', //主题
//        body:'发送邮件成功', //发送的内容
//        //html:'<p>hello</p>', //如果要发送html
//        //attachments: attachment //如果要发送附件
//    },
////回调函数，用户判断发送是否成功，如果失败，输出失败原因。
//    function(error,success){
//        if(!error){
//            console.log('message success');
//        }else{
//            console.log('failed'+error);
//        }
//    }
//)

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
