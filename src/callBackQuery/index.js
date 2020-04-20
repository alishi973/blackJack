const blackJackOffline = require('../actions/blackJackoffline');
module.exports = (bot) => {
  bot.on('callback_query', async (ctx) => {
    const command = (cmd) => (ctx.update.callback_query.data.indexOf(cmd) != -1 ? true : false);
    const param = ctx.update.callback_query.data;
    if (command('HitOff')) {
      ctx.answerCbQuery('Hit');
      blackJackOffline.HitOff(ctx, param.split('|')[1]);
    }
    if (command('StandOff')) {
      blackJackOffline.StandOff(ctx, param.split('|')[1]);
      ctx.answerCbQuery('Hit');
    }

    /* await sendMessageWithDelay(5000);
    await sendMessageWithDelay(5000); */
  });
};
