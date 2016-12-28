'use strict';

let nodemailer = require('nodemailer');
let EmailTemplates = require('swig-email-templates');
let config = require("config");

let mail = nodemailer.createTransport(config.get("email"));

let templates = new EmailTemplates({
    root: 'email/templates',
    text: false,
    swig: { cache: false }
});
let sendEmail = function(to, templateName, context) {
    return new Promise((resolve, reject) => {
        templates.render(templateName, context, function(err, html, text, subject) {
            console.log('err: ' + err);
            console.log('html: ' + html);
            console.log('subject: ' + subject);
            mail.sendMail({
                sender: config.get("email.auth.user"),
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
    });
};

module.exports = {
    sendEmail: sendEmail
};