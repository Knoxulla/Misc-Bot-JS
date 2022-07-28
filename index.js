const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Client, GatewayIntentBits, Message } = require("discord.js")
const client = new Client(
  {
    intents:
      [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent]
  });
var module_commands = require("./deploy-commands.js")
const TOKEN = process.env['TOKEN']

// Set the prefix
const prefix = "$";

// Get Ready
client.once('ready', () => { console.log('Ready!') });

// Get Insults
function getInsult() {
  return fetch("https://evilinsult.com/generate_insult.php?lang=en&type=XML")
    .then(res => { return res.json() })
    .then(insult => { return insult.toString() })
}

client.on("messageCreate", Message => {
  if (!Message.content.startsWith(prefix)) return;
  if (Message.author === "921688295673593896") { return }
  if (Message.content.startsWith(`${prefix}ping`)) {
    Message.reply("pong")
  }
  if (Message.content.startsWith(`${prefix}insult`)) {
    getInsult()
      .then(insult => { Message.channel.send(insult.toString()) })
    console.log(getInsult().toString())
    console.log(getInsult())
  }
})
client.login(TOKEN)
