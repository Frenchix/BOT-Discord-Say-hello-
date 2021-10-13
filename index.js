const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    // console.log(client.channels.cache.get('609883567899672592').members);
    const guild = client.guilds.cache.get("239827251540131851");
    const guildNames = guild.channels.cache.map(g => {
        console.log(g.name)});
});

client.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    member.guild.channels.cache.find(c => c.name === "welcome").send(`"${member.user.username}" has joined this server`);
});

client.on("guildMemberSpeaking", function(member, speaking){
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
});
// Login to Discord with your client's token
client.login(process.env.token);