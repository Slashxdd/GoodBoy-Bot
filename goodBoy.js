const TelegramBot = require('node-telegram-bot-api');
const request = require('request-promise');
const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash(
{ 
  accessKey: "{0432e638c069fe0d575ea306ac1f883a33a9fcf315b4507ea36c563596aadbe4}",
  headers: {
    authorization: "Bearer 0432e638c069fe0d575ea306ac1f883a33a9fcf315b4507ea36c563596aadbe4"
  }
});
const toJson = require("unsplash-js");

// replace the value below with the Telegram token you receive from @BotFather
const token = '994931465:AAEbS09-ADgocOP3CG662tsecejkEkJHb_Y';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("polling_error", (err) => console.log(err));

// Matches "/echo [whatever]"
bot.onText(/\/speak/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = "Woof! Woof!"
  //const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/bring (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 

    const options = {
      method: 'GET',
      uri: 'https://api.unsplash.com/photos/random',
      qs: {
        client_id: '0432e638c069fe0d575ea306ac1f883a33a9fcf315b4507ea36c563596aadbe4',
        query: resp
      },
      json: true
  }
  request(options)
      .then(function (response) {
        console.log(response);
        bot.sendPhoto(chatId, response.urls.regular);
      })
      .catch(function (err) {
        console.log(err);
      })
  });

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });