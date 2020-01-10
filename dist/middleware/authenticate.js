'use strict';

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = 'Top-Floor-Secret';

exports.authorization = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'La peticion no tiene la cabecera de autenticacion'
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    _jsonwebtoken.default.verify(token, secret, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: err
        });
      }

      req.user = decode;
      next();
    });
  } catch (error) {
    return res.status(404).send({
      message: 'Token no valido'
    });
  }
}; // exports.validate=(req, res, next)=>{
//     let user = req.user;
//     if(user.id_role.role === 'administrator'){
//         next();
//     }else{
//         res.status(200).send({message:'Permiso denegado'});
//     }    
// }