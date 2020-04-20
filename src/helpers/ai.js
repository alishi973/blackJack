const { GameModel } = require('../models');
const { renderDeck } = require('./deck');
const { randomCard, sumCard, random } = require('./cards');

const actionWithDelayRecursive = async (ctx, sessionId) => {
  setTimeout(async () => {
    const game = await GameModel.findById(sessionId);
    const sumDeck = sumCard(game.player2_deck);
    if (sumDeck < 21 && sumCard(game.player1_deck) > sumDeck) {
      const diffrence = 21 - sumDeck;
      if (random(0, 8) < diffrence) {
        game.player2_deck.push(randomCard());
        await game.save();
        renderDeck(sessionId, ctx);
        return actionWithDelayRecursive(ctx, sessionId);
      }
    }
    game.player2_done = true;
    await game.save();
    return renderDeck(sessionId, ctx);
  }, 2000);
};

module.exports = {
  actionWithDelay: async (ctx, sessionId) => actionWithDelayRecursive(ctx, sessionId),
};
