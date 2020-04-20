const { Markup, Extra } = require('telegraf');
module.exports = {
  random: (ctx) => {
    return ctx.reply(
      'random example',
      Markup.inlineKeyboard([
        Markup.callbackButton('Coke', 'Coke'),
        Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
        Markup.callbackButton('Pepsi', 'Pepsi'),
      ]).extra(),
    );
  },
  start: (ctx) => {
    // console.log(ctx.message.text);
  },
};
