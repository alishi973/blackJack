require('dotenv').config();
const telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');

const attachUser = require('./src/middlewares/attachUser');
// const phrases = require('./src/locale/fa.json');
const commands = require('./src/commands');
const actions = require('./src/actions');
const callbackQuery = require('./src/callBackQuery');

const bot = new telegraf(process.env.TOKEN);
process.bot = bot;
bot.use(attachUser);

commands(bot);
actions(bot);
callbackQuery(bot);

/* bot.telegram.sendMessage(
  '370173903',
  'asd',
  Extra.markup(Markup.inlineKeyboard([Markup.callbackButton('test', 'SNU|' + 'asd' + '|' + 'mac')])),
); */

/* bot.on('inline_query', (ctx) => {
  const result = [];
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
  console.log(ctx);

  // Using context shortcut
  ctx.answerInlineQuery(result);
}); */

bot.startPolling();
