const prices = [100, 50, 10, 5];
const { Markup, Extra } = require('telegraf');
const blackJackOffline = require('./blackJackoffline');
module.exports = (bot) => {
  prices.map((value) =>
    bot.action(`addBet:${value}`, (ctx) => {
      // console.log(ctx.update.callback_query.message);
      const messageObj = ctx.update.callback_query.message;
      const buttons = [
        [...prices.map((value) => Markup.callbackButton(`💲+${value}`, `addBet:${value}`))],
        [Markup.callbackButton(`بیخیال❌`, `cancelSessionBot`), Markup.callbackButton(`بزن بریم✋`, `startSessionBot`)],
      ];

      let prevText = `${messageObj.text}`;
      let lastIndexOfMoney = prevText.lastIndexOf(':');
      let currentPrice = parseInt(prevText.slice(lastIndexOfMoney + 4, prevText.length));

      ctx.editMessageText(
        `${prevText.slice(0, lastIndexOfMoney + 4)}${currentPrice + value}`,
        Markup.inlineKeyboard(buttons).extra(),
      );
      return ctx.answerCbQuery(`${value} به مبلغ شرط بندیت اضافه شد`);
    }),
  );

  bot.action('cancelSessionBot', (ctx, next) => {
    ctx.deleteMessage();
    return ctx.answerCbQuery(`اوکی کنسل کردم`);
  });

  bot.action('startSessionBot', blackJackOffline.startSession);
};
