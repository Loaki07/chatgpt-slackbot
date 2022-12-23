const { App } = require('@slack/bolt');

const { talkToChatGpt } = require('./config/openai');
require('dotenv').config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

// Listens to app mentions
app.event('app_mention', async ({ event, say }) => {
  const user = event.user;
  const res = await talkToChatGpt(event.text);
  await say(`<@${user}> \n${res.message}`)
});

app.event('message', async ({ event, say }) => {
  // Check if the message is a direct message
  if (event.channel_type === 'im') {
    const user = event.user;

    const res = await talkToChatGpt(event.text);

    // Send a message in response to the direct message
    await say({
      channel: user,
      text: res.message,
    });
  }
});


(async () => {
  await app.start();

  console.log('⚡️ ChatGpt Bot is Online!');
})();