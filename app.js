require('dotenv').config();
const telegraf = require('telegraf');
const attachUser = require('./src/middlewares/attachUser');
const phrases = require('./src/locale/fa.json');
const commands = require('./src/commands');

const bot = new telegraf(process.env.TOKEN);

bot.use(attachUser);

bot.command('start', (ctx) => ctx.reply(phrases.start));

commands(bot);

bot.startPolling();
