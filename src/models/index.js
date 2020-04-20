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
  credit: { type: Number, default: 1000 },
});
const Transactions = new Schema({
  amount: { type: Number, default: 0 },
  chatStatus: { type: Object, default: '' },
});

module.exports = {
  UserModel: mongoose.model('Users', User),
  TransactionsModel: mongoose.model('Transactions', Transactions),
};
