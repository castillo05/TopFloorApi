'use strict';

var _express = _interopRequireDefault(require("express"));

var _authenticate = require("../middleware/authenticate");

var _Project = require("../controllers/Project.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express.default.Router();

api.post('/project', _authenticate.authorization, _Project.projectStore);
api.get('/projects', _authenticate.authorization, _Project.getProjects);
api.get('/project/:id', _authenticate.authorization, _Project.getProject);
api.put('/project/:id', _authenticate.authorization, _Project.updateProject);
api.delete('/project/:id', _authenticate.authorization, _Project.deleteProject);
module.exports = api;