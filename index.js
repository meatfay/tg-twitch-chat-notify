import tmi from "tmi.js"
import { Telegraf } from 'telegraf'
import dotenv from "dotenv"
import moment from "moment"

dotenv.config()

const client = new tmi.Client({
    options: {
        debug: true,
        messagesLogLevel: "info"
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.TWITCH_BOTNAME,
        password: process.env.TWITCH_OAUTH
    },
    channels: ["meatoff"]
});

const bot = new Telegraf(process.env.TG_OAUTH)

client.connect().catch(console.error)

client.on('message', (channel, tags, message, self) => {
    if(self) return;

    let sendTime = moment().format('YYYY-MM-D HH:mm:ss')

    bot.telegram.sendMessage(process.env.TG_CHAT_ID, `<i>${sendTime}</i> ---- <b>${tags.username}</b> :  "${message}"`, {parse_mode: 'HTML'})
});