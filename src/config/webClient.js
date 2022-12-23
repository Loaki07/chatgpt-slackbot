const { WebClient } = require('@slack/web-api');
require('dotenv').config()

const web = new WebClient(process.env.SLACK_BOT_AUTH);

const sendMessage = async (channel, message) => {
    await web.chat.postMessage({
        channel,
        text: message,
    })
};

module.exports = { sendMessage };