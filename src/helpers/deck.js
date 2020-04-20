const { GameModel, UserModel } = require('../models');
const { sumCard } = require('./cards');
const { Extra, Markup } = require('telegraf');
module.exports = {
  renderDeck: async (sessionId, ctx) => {
    const game = await GameModel.findById(sessionId)
      .populate('player1', ['userName'])
      .populate('player2', ['userName']);
    const player1Sum = sumCard(game.player1_deck);
    const player2Sum = sumCard(game.player2_deck);
    let logs = [];
    if (player1Sum > 21) {
      game.ended = true;
      logs.push(`${game.player1.userName} Lose Game`);
    }
    if (player2Sum > 21) {
      game.ended = true;
      const user = await UserModel.findById(game.player1);
      user.credit += game.bet_amount * 2;
      user.save();
      logs.push(`${game.player2.userName} Lose Game`);
    }
    if (player1Sum == 21 && game.player1_deck.length == 2 && game.player2_deck.length == 2) {
      game.ended = true;
      const user = await UserModel.findById(game.player1);
      user.credit += game.bet_amount * 2;
      user.save();
      logs.push(`${game.player1.userName} Make Ace`);
    }
    if (player2Sum == 21 && game.player1_deck.length == 2 && game.player2_deck.length == 2) {
      game.ended = true;
      logs.push(`${game.player2.userName} Make Ace `);
    }
    if (game.player1_done && game.player2_done) {
      game.ended = true;
      if (player1Sum > player2Sum) {
        const user = await UserModel.findById(game.player1);
        user.credit += game.bet_amount * 2;
        user.save();
        logs.push(`${game.player1.userName} Win The Game!`);
      } else {
        logs.push(`${game.player2.userName} Win The Game!`);
      }
    }
    const caption = `
    ${game.player1.userName} Deck:${game.player1_deck.map((card) => card.name)}=>${player1Sum}
    ${game.player2.userName} Deck:${game.player2_deck.map((card) => card.name)}=>${player2Sum}
    ${logs && logs.length > 0 ? '---' : ''}
    ${logs}
    `;

    const game_buttons = !game.player1_done
      ? [
          Markup.callbackButton(`Hit☝️`, `HitOff|${sessionId}`),
          Markup.callbackButton(`Stand✋`, `StandOff|${sessionId}`),
        ]
      : [];
    await ctx.editMessageText(
      caption,
      !game.ended
        ? Markup.inlineKeyboard([...game_buttons]).extra()
        : Markup.inlineKeyboard([Markup.callbackButton(`Retry`, `newGameWithBot`)]).extra(),
    );
    return game;
  },
  newGameOff: async (ctx) => {
    const prices = [100, 50, 10, 5];
    const buttons = [
      [...prices.map((value) => Markup.callbackButton(`💲+${value}`, `addBet:${value}`))],
      [Markup.callbackButton(`بیخیال❌`, `cancelSessionBot`), Markup.callbackButton(`بزن بریم✋`, `startSessionBot`)],
    ];
    try {
      ctx.editMessageText(
        `میخوایم یه بازی شروع کنیم،بگو چقد میخوای بزاری فعلا انقد گزاشتی: 💲${0}`,
        Markup.inlineKeyboard(buttons).extra(),
      );
    } catch (err) {
      ctx.reply(
        `میخوایم یه بازی شروع کنیم،بگو چقد میخوای بزاری فعلا انقد گزاشتی: 💲${0}`,
        Markup.inlineKeyboard(buttons).extra(),
      );
    }
  },
};
