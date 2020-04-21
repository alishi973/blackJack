const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const defaultBotId = '';
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
const Games = new Schema({
  player1: { type: ObjectID, ref: 'Users' },
  player2: { type: ObjectID, ref: 'Users' },
  bet_amount: { type: Number, required: true },
  player1_deck: { type: Array },
  player2_deck: { type: Array },
  player1_done: { type: Boolean, default: false },
  player2_done: { type: Boolean, default: false },
  ended: { type: Boolean, default: false },
});

module.exports = {
  UserModel: mongoose.model('Users', User),
  TransactionsModel: mongoose.model('Transactions', Transactions),
  GameModel: mongoose.model('Games', Games),
};
