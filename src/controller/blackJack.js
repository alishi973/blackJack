const { Markup } = require('telegraf');
module.exports = {
  startNewGame: (ctx) => {
    ctx.reply(
      'یه بازی بلک جک ساختیماولین نفری که جوین بشه دو نفری بازی میکنیم',
      Markup.inlineKeyboard([Markup.urlButton('test', `https://t.me/${process.env.BOT_USERNAME}?start=dsa`)]).extra(),
    );
  },
  startNewGameWithBot: async (ctx) => {
    const prices = [100, 50, 10, 5];
    const buttons = [
      [...prices.map((value) => Markup.callbackButton(`💲+${value}`, `addBet:${value}`))],
      [Markup.callbackButton(`بیخیال✖️`, `cancelSessionBot`), Markup.callbackButton(`بزن بریم✋`, `startSessionBot`)],
    ];
    ctx.reply(
      `میخوایم یه بازی شروع کنیم،بگو چقد میخوای بزاری فعلا انقد داری:${0}`,
      Markup.inlineKeyboard(buttons).extra(),
    );
  },
};

// https://t.me/${process.env.BOT_USERNAME}?start=dsa
