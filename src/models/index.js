const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  UserID: { type: 'String', required: true },
  userName: { type: 'String' },
  fname: { type: 'String' },
  lname: { type: 'String' },
});
module.exports = mongoose.model('Users', User);
