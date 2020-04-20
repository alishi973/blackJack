const { GameModel } = require('../models');
const { Extra, Markup } = require('telegraf');
const cards=[
    {name:"Ace",value:true},
    {name:"Two",value:2},
    {name:"Three",value:3},
    {name:"Four",value:4},
    {name:"Five",value:5},
    {name:"Six",value:6},
    {name:"Seven",value:7},
    {name:"Eight",value:8},
    {name:"Nine",value:9},
    {name:"Ten",value:10},
    {name:"Jack",value:10}
    {name:"Queen",value:10}
    {name:"King",value:10}
]
module.exports = {
  startSession: async (ctx) => {
    const messageObj = ctx.update.callback_query.message;
    let prevText = `${messageObj.text}`;
    let lastIndexOfMoney = prevText.lastIndexOf(':');
    let currentPrice = parseInt(prevText.slice(lastIndexOfMoney + 4, prevText.length));
    const newGame = new GameModel({
      player1: ctx.from.id,
      player2: 'Bot',
      bet_amount: currentPrice,
    });
    await newGame.save();

    ctx.deleteMessage();

    const game = await ctx.reply('اوکی شروع کنیم');
    setTimeout(() => {
      ctx.deleteMessage(game.message_id);
      newGame.ended = true;
      newGame.save();
    }, 60000);
    game.editMessageText(`Your Deck:${}`);

    return ctx.answerCbQuery('بازی شروع شد');
  },
};

