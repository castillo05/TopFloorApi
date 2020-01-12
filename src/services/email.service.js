'use strict'
require('dotenv').config();
function email(receptor,nombre_rec,user){
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.API_KEY_SENDGRID || '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');
    const msg = {
    to: receptor,
    from: 'jcdevelopernicaragua@gmail.com',
    subject: 'Confirmación de Correo',
    text: 'Confirmación',
    html:'<table style="border:none;padding:0 18px;margin:50px auto;width:500px"><tbody><tr width="100%" height="57"><td valign="top" align="left" style="border-top-left-radius:4px;border-top-right-radius:4px;background:#0079bf;padding:12px 18px;text-align:center"><h1 style="color:white;text-align:center">JC Developer</h1></td></tr><tr width="100%"><td valign="top" align="left" style="border-bottom-left-radius:4px;border-bottom-right-radius:4px;background:#fff;padding:18px"><h1 style="font-size:20px;margin:0;color:#333">Hola "'+nombre_rec+'"</h1><p style="font:15px/1.25em Helvetica Neue,Arial,Helvetica;color:#333">Gracias Por Registrarte. Click <a href="https://gentle-shelf-08563.herokuapp.com/verified/'+user+'">Aqui</a> para activar tu cuenta...!</p><p style="font:15px/1.25em Helvetica Neue,Arial,Helvetica;color:#333"></p></td></tr></tbody></table>'
    };
    sgMail.send(msg);
}

exports.email=email;