'use strict';

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let schema = _mongoose.default.Schema;
let UserSchema = new schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verified: Boolean
});
module.exports = _mongoose.default.model('User', UserSchema);