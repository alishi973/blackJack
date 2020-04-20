const blackJackController = require('./controller/blackJack');
const defaultController = require('./controller/default');
module.exports = (bot) => {
  bot.command('start', defaultController.start);
  bot.command('blstarton', blackJackController.startNewGame);
  bot.command('blstart', blackJackController.startNewGameWithBot);

  bot.command('random', defaultController.random);
};
