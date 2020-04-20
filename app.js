require('dotenv').config();
const telegraf = require('telegraf');

const attachUser = require('./src/middlewares/attachUser');
const phrases = require('./src/locale/fa.json');
const commands = require('./src/commands');
const actions = require('./src/actions');

const bot = new telegraf(process.env.TOKEN);

bot.use(attachUser);

commands(bot);
actions(bot);

/* bot.on('inline_query', (ctx) => {
  const result = [];
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
  console.log(ctx);

  // Using context shortcut
  ctx.answerInlineQuery(result);
}); */

bot.startPolling();
