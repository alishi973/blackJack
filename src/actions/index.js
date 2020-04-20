
module.exports = (bot) => {
  bot.action('Dr Pepper', (ctx, next) => {
    return ctx.reply('👍').then(() => next());
  });
  bot.action('Pepsi', (ctx, next) => {
    return ctx.reply('👍').then(() => next());
  });
  bot.action('addBet:50', (ctx) => {
    console.log('bet added');
    ctx.answerCbQuery("50 added to bet")
    return ctx.reply("added")
  });
};
