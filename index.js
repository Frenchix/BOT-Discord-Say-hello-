const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    console.log(client.channels.cache.get('609883567899672592').members);
});

client.on('guildMemberAdd', member => {
    // This function is executed when a user joins a server
    // that has your bot in it
    console.log(member);
    // /!\ Discord.js uses the term "guild", but it just means "server"
    // Remember to use "guild" instead of "server" in your code!
    });

// Login to Discord with your client's token
client.login(process.env.token);