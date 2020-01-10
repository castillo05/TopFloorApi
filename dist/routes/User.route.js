'use strict';

var _express = _interopRequireDefault(require("express"));

var _authenticate = require("../middleware/authenticate");

var _User = require("../controllers/User.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express.default.Router();

api.post('/singup', _User.singup);
api.post('/singin', _User.singin);
api.get('/user/:id', _authenticate.authorization, _User.getUser);
api.put('/user/:id', _authenticate.authorization, _User.updateUser);
api.delete('/user/:id', _authenticate.authorization, _User.deleteUser);
api.get('/verified/:id', _User.verified);
module.exports = api;