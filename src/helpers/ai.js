const { GameModel } = require('../models');
const { renderDeck } = require('./deck');
const { randomCard, sumCard, random } = require('./cards');
module.exports = {
  actionWithDelay: async (ctx, sessionId) => {
    const game = await GameModel.findById(sessionId);
    game.player2_deck.push(randomCard());
    const sumDeck = sumCard(game.player2_deck);
    await game.save();
    renderDeck(sessionId, ctx);
    console.log('sumDeck', sumDeck);
    if (sumDeck < 21) {
      const diffrence = 21 - sumDeck;
      console.log('diffrence', diffrence);
      if (random(0, 10) < diffrence) {
        console.log('again');
        return this.actionWithDelay(ctx, sessionId);
      }
    }
    console.log('Final Round');
    game.player2_done = true;
    await game.save();
    renderDeck(sessionId, ctx);
  },
};
