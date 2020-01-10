'use strict';

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let schema = _mongoose.default.Schema;
let AgentSchema = new schema({
  agentCode: String,
  agentName: String,
  agentCommission: Number
});
module.exports = _mongoose.default.model('Agents', AgentSchema);