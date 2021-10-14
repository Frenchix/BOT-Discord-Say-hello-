const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    // console.log(client.channels.cache.get('609883567899672592').members);
    const guild = client.guilds.cache.get("239827251540131851");
    // const guildNames = guild.channels.cache.map(g => {
    //     console.log(g.name)});
});
client.on('voiceStateUpdate', function (oldMember, newMember) {
	// console.log("oldMember", oldMember);
    console.log("newMember", oldMember.voiceChannel);
});

// Login to Discord with your client's token
client.login(process.env.token);