const { UserModel } = require('../models/index');

module.exports = async (ctx, next) => {
  let user = await UserModel.findOne({ UserID: ctx.from.id });
  if (!user) {
    const newUser = new UserModel({
      UserID: ctx.from.id,
      userName: ctx.from.username,
      fname: ctx.from.first_name,
      lname: ctx.from.last_name,
      dataJoined: new Date().toLocaleString(),
    });
    newUser.save();
    user = newUser;
  }
  ctx.dbuser = user;
  next();
};
