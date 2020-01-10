'use strict';

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function email(receptor, nombre_rec, user) {
  _nodemailer.default.createTestAccount((err, account) => {
    var transport = _nodemailer.default.createTransport({
      service: 'Gmail',
      auth: {
        user: 'jcdevelopernicaragua@gmail.com',
        pass: 'Andrey18.'
      }
    });

    var mailOption = {
      from: '<jcdevelopernicaragua@gmail.com>',
      to: receptor,
      subject: 'Correo de Confirmacion',
      text: '',
      html: '<table style="border:none;padding:0 18px;margin:50px auto;width:500px"><tbody><tr width="100%" height="57"><td valign="top" align="left" style="border-top-left-radius:4px;border-top-right-radius:4px;background:#0079bf;padding:12px 18px;text-align:center"><h1 style="color:white;text-align:center">JC Developer</h1></td></tr><tr width="100%"><td valign="top" align="left" style="border-bottom-left-radius:4px;border-bottom-right-radius:4px;background:#fff;padding:18px"><h1 style="font-size:20px;margin:0;color:#333">Hola "' + nombre_rec + ',' + user + '"</h1><p style="font:15px/1.25em Helvetica Neue,Arial,Helvetica;color:#333">Gracias Por Registrarte. Click <a href="http://localhost:2000/verified/' + user + '">Aqui</a> para activar tu cuenta...!</p><p style="font:15px/1.25em Helvetica Neue,Arial,Helvetica;color:#333"></p></td></tr></tbody></table>'
    };
    transport.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
      } // console.log('Mensaje Enviado' , info.messageId);
      //console.log('Vista Previa de URL', nodemailer.getTestMessageUrl(info));

    });
  });
}

exports.email = email;