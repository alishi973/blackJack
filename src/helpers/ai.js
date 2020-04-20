const { GameModel } = require('../models');
const { renderDeck } = require('./deck');
const { randomCard, sumCard } = require('./cards');
module.exports = {
  actionWithDelay: async (ctx, sessionId) => {
    const game = await GameModel.findById(sessionId);
    game.player2_deck.push(randomCard());
    const sumDeck = sumCard(game.player2_deck);
    await game.save();
    renderDeck(sessionId, ctx);
    if(sumDeck<21){
        
    }
  },
};
