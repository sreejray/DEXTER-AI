import Telegram from "node-telegram-bot-api";
import { Configuration, OpenAIApi } from "openai";

const telToken = "Add your own Telegram Token within this quotes";
const openaiapi = "Add your own OpenAI API Key within this quote";

const config = new Configuration ({
    apiKey: openaiapi,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(telToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome To DEXGPT!");
});

bot.on("message", async (msg) => {
    //  console.log(msg);
    const chatId = msg.chat.id;

    const reply = await openai.createCompletion ({
        max_tokens: 4000,
        model: "text-davinci-003",
        prompt: msg.text,
        temperature: 0.5,
    });

    bot.sendMessage(chatId, reply.data.choices[0].text);
});
