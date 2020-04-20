module.exports = {
  sendMessageWithDelay: (timeOut = 2000) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        process.bot.telegram.sendMessage('370173903', 'slm test with delay');
        res();
      }, timeOut);
    }),
};
