const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log('MONGO connected');
  })
  .catch((error) => console.log(error));

const User = new Schema({
  UserID: { type: 'String', required: true },
  userName: { type: 'String' },
  fname: { type: 'String' },
  lname: { type: 'String' },
  dataJoined: { type: Date },
});

module.exports = { UserModel: mongoose.model('Users', User) };
