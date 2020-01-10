"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = _interopRequireDefault(require("./models"));

var _app = require("./app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://topfloor:topfloor05@ds261648.mlab.com:61648/topfloordb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, res) => {
  if (error) return console.log(error);

  _app.app.listen(2000, () => {
    console.log('Servidor corriendo en el puerto ' + 2000);
  });
});

_models.default.sequelize.authenticate().then(() => {
  console.log('Conectado a DB Sql');
});