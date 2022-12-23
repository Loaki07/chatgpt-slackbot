const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
require('dotenv').config();

const configuration = new Configuration({
    organization: "org-i2kmbzPWhDKuv4ksICN9Sfpn",
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

const talkToChatGpt = async (message) => {
    try {

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 100,
            temperature: 0,
        });

        if (response.data) {
            return {
                message: response.data.choices[0].text
            }
        }
    } catch (error) {
            return {
                message: "We're experiencing high demand, Please, try again."
            }
    }
}

module.exports = { talkToChatGpt }