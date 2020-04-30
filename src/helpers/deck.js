const { GameModel, UserModel } = require('../models');
const { sumCard } = require('./cards');
const { Extra, Markup } = require('telegraf');
module.exports = {
  renderDeck: async (sessionId, ctx) => {
    const game = await GameModel.findById(sessionId)
      .populate('player1', ['userName'], ['fname'], ['lname'])
      .populate('player2', ['userName'], ['fname'], ['lname']);
    const player1_name = game.player1.userName.userName ? game.player1.userName : `${game.player1.fname} ${game.player1.lname}`;
    const player2_name = game.player2.userName.userName ? game.player2.userName : `${game.player2.fname} ${game.player2.lname}`;
    const player1Sum = sumCard(game.player1_deck);
    const player2Sum = sumCard(game.player2_deck);
    let logs = [];
    if (player1Sum > 21) {
      game.ended = true;
      logs.push(`${player1_name} Lose Game`);
    }
    if (player2Sum > 21) {
      game.ended = true;
      const user = await UserModel.findById(game.player1);
      user.credit += game.bet_amount * 2;
      user.save();
      logs.push(`${player2_name} Lose Game`);
    }
    if (player1Sum == 21 && game.player1_deck.length == 2 && game.player2_deck.length == 2) {
      game.ended = true;
      const user = await UserModel.findById(game.player1);
      user.credit += game.bet_amount * 2;
      user.save();
      logs.push(`${player1_name} Make Ace`);
    }
    if (player2Sum == 21 && game.player1_deck.length == 2 && game.player2_deck.length == 2) {
      game.ended = true;
      logs.push(`${player2_name} Make Ace `);
    }
    if (game.player1_done && game.player2_done) {
      game.ended = true;
      if (player1Sum > player2Sum) {
        const user = await UserModel.findById(game.player1);
        user.credit += game.bet_amount * 2;
        user.save();
        logs.push(`${player1_name} Win The Game!`);
      } else {
        logs.push(`${player2_name} Win The Game!`);
      }
    }
    const caption = `
    ${player1_name} Deck:${game.player1_deck.map((card) => card.name)}=>${player1Sum}
    ${player2_name} Deck:${game.player2_deck.map((card) => card.name)}=>${player2Sum}
    ${logs && logs.length > 0 ? '---' : ''}
    ${logs}
    `;

    const game_buttons = !game.player1_done
      ? [Markup.callbackButton(`Hit☝️`, `HitOff|${sessionId}`), Markup.callbackButton(`Stand✋`, `StandOff|${sessionId}`)]
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
      ctx.editMessageText(`میخوایم یه بازی شروع کنیم،بگو چقد میخوای بزاری فعلا انقد گزاشتی: 💲${0}`, Markup.inlineKeyboard(buttons).extra());
    } catch (err) {
      ctx.reply(`میخوایم یه بازی شروع کنیم،بگو چقد میخوای بزاری فعلا انقد گزاشتی: 💲${0}`, Markup.inlineKeyboard(buttons).extra());
    }
  },
};
