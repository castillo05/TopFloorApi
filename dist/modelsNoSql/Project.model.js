"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let schema = _mongoose.default.Schema;
let ProjectSchema = new schema({
  nameProject: String,
  description: String
});
module.exports = _mongoose.default.model('Project', ProjectSchema);