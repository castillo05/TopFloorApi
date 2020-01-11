'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json()); //configurar cabeceras http

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); //Cargamos una ruta estatica que es la carpeta client

app.use('/', _express.default.static('dist/client', {
  redirect: false
}));
app.get('/api', (req, res) => {
  res.status(200).send({
    message: 'Bienvenido a Top Floor Marketing'
  });
});
app.use(require('./routes/index'));
app.get('*', function (req, res, next) {
  res.sendFile(_path.default.resolve('dist/client/index.html'));
});