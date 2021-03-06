'use strict';

var _User = _interopRequireDefault(require("../modelsNoSql/User.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _email = _interopRequireDefault(require("../services/email.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let singup = (req, res) => {
  let U = new _User.default();
  const saltRound = 1;
  U.firstName = req.body.firstName;
  U.lastName = req.body.lastName;
  U.email = req.body.email;

  let searchUser = _User.default.find({
    email: req.body.email.toLowerCase()
  }).sort();

  searchUser.exec((err, user) => {
    if (err) return res.status(500).send({
      message: err
    });

    if (user.length >= 1) {
      res.status(200).send({
        message: 'Este email ya existe'
      });
    } else {
      if (req.body.password) {
        _bcrypt.default.hash(req.body.password, saltRound, (err, hash) => {
          if (err) return console.log(err);
          U.password = hash;
          U.save((err, singup) => {
            if (err) return console.log(err);

            if (!singup) {
              res.status(500).send({
                message: 'Problemas en el registro de usuario'
              });
            } else {
              res.status(200).send({
                user: singup,
                message: 'Hemos enviado un email de verificación'
              });

              _email.default.email(req.body.email, req.body.firstName + ' ' + req.body.lastName, singup._id);
            }
          });
        });
      } else {
        return res.status(500).send({
          message: 'Introduzca la contraseña'
        });
      }
    }
  });
};

let singin = async (req, res) => {
  try {
    let email = req.body.email;
    let searchUser = await _User.default.findOne({
      email: email.toLowerCase()
    });
    console.log(searchUser);

    if (!searchUser) {
      res.status(500).send({
        message: 'Estos datos no existen'
      });
    } else if (!searchUser.verified) {
      res.status(401).send({
        message: 'Esta cuenta no esta verificada'
      });
    } else {
      if (!req.body.password) return res.status(200).send({
        message: 'Introduzca la contraseña'
      });

      _bcrypt.default.compare(req.body.password, searchUser.password, (err, check) => {
        if (err) {
          console.log(err);
        } else {
          if (!check) return res.status(200).send({
            message: 'Contraseña Incorrecta'
          });

          let token = _jsonwebtoken.default.sign({
            user: searchUser
          }, 'Top-Floor-Secret', {
            expiresIn: 60 * 60
          });

          if (req.body.gethash) {
            res.status(200).send({
              token: token
            });
          } else {
            res.status(200).send({
              user: searchUser
            });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

let getUser = (req, res) => {
  let id = req.params.id;

  let searchUserOne = _User.default.findById(id);

  searchUserOne.then(user => {
    if (!user) return res.status(200).send({
      message: 'Este usuario no existe'
    });
    res.status(200).send({
      user: user
    });
  }).catch(error => {
    console.log(error);
  });
};

let updateUser = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  _User.default.findByIdAndUpdate(id, data, (err, user) => {
    if (err) return console.log(err);

    if (!user) {
      res.status(200).send({
        message: 'Este usuario no existe'
      });
    } else {
      res.status(200).send({
        user: user
      });
    }
  });
};

let deleteUser = (req, res) => {
  let id = req.params.id;

  _User.default.findByIdAndRemove(id, (err, message) => {
    if (err) return console.log(err);

    if (!message) {
      res.status(200).send({
        message: 'Este usuario no existe'
      });
    } else {
      res.status(200).send({
        message: 'Usuario Eliminado con exito!'
      });
    }
  });
};

let verified = (req, res) => {
  let id = req.params.id;

  let search = _User.default.findById(id);

  search.exec((err, user) => {
    if (user.verified) return res.status(401).send({
      message: 'Tu cuenta ya esta verificada'
    });

    _User.default.findByIdAndUpdate(id, {
      verified: 1
    }, (err, verified) => {
      if (err) return res.status(500).send({
        message: err
      });
      res.redirect('https://gentle-shelf-08563.herokuapp.com/login');
    });
  });
};

module.exports = {
  singup,
  singin,
  getUser,
  updateUser,
  deleteUser,
  verified
};