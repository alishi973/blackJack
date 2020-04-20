const { GameModel, UserModel } = require('../models');
const { Extra, Markup } = require('telegraf');
const { randomCard, sumCard } = require('../helpers/cards');
const { actionWithDelay } = require('../helpers/ai');
const { renderDeck, newGameOff } = require('../helpers/deck');

module.exports = {
  startSession: async (ctx) => {
    const messageObj = ctx.update.callback_query.message;
    let prevText = `${messageObj.text}`;
    let lastIndexOfMoney = prevText.lastIndexOf(':');
    let currentPrice = parseInt(prevText.slice(lastIndexOfMoney + 4, prevText.length));
    const user = await UserModel.findById(ctx.dbuser.id);
    user.credit -= currentPrice;
    await user.save();
    const newGame = new GameModel({
      player1: ctx.dbuser.id,
      bet_amount: currentPrice,
    });

    // ctx.deleteMessage();

    newGame.player1_deck = [randomCard(), randomCard()];
    newGame.player2_deck = [randomCard(), randomCard()];
    await newGame.save();
    /* const messageText = `
    Your Deck:${newGame.player1_deck.map((card) => card.name)}=>${sumCard(newGame.player1_deck)}
    Opponent Deck:${newGame.player2_deck.map((card) => card.name)}=>${sumCard(newGame.player2_deck)}
    `;
    const buttons = [
      Markup.callbackButton(`Hit☝️`, `HitOff|${newGame.id}`),
      Markup.callbackButton(`Stand✋`, `StandOff|${newGame.id}`),
    ];
    const game = await ctx.reply(messageText, Markup.inlineKeyboard([...buttons]).extra()); */
    const game = await renderDeck(newGame.id, ctx);
    setTimeout(() => {
      ctx.deleteMessage(game.message_id);
      newGame.ended = true;
      newGame.save();
    }, 60000);

    return ctx.answerCbQuery('بازی شروع شد');
  },
  HitOff: async (ctx, sessionId) => {
    const game = await GameModel.findById(sessionId);
    game.player1_deck.push(randomCard());
    await game.save();
    renderDeck(sessionId, ctx);
  },
  StandOff: async (ctx, sessionId) => {
    const game = await GameModel.findById(sessionId);
    game.player1_done = true;
    await game.save();
    actionWithDelay(ctx, sessionId);
    // ctx.reply(game.player1);
  },
  retry: (ctx) => {
    newGameOff(ctx);
  },
};
