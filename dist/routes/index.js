"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(require('./User.route'));
app.use(require('./Project.route'));
app.use(require('./agents.route'));
module.exports = app;