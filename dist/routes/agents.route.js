'use strict';

var _express = _interopRequireDefault(require("express"));

var _authenticate = require("../middleware/authenticate");

var _Agents = require("../controllers/Agents.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express.default.Router();

api.get('/agents', _authenticate.authorization, _Agents.getAgents);
api.get('/agentsinformation', _authenticate.authorization, _Agents.getInformationOfAgents);
module.exports = api;