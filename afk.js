const mineflayer = require('mineflayer');
const readline = require('readline');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sme.jartex.fun',
    port: 25565,
    username: 'oirit',
    version: '1.20.4'
  });

  bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      console.log(`<${username}> ${message}`);
    }
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    if (bot && bot.chat) {
      bot.chat(input);
    }
  });

  bot.on('login', () => {
    console.log('Bot logged in as oirit!');
    setTimeout(() => {
      bot.chat('/server oneblock');
      setTimeout(() => {
        bot.chat('/server oneblock');
      }, 5000);
    }, 5000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('Error:', err);
  });
}

createBot();
