const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const say = require('say')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = createAudioPlayer();

// When the client is ready, run this code (only once)
client.once('ready', () => {
    
	console.log('Ready!');
    // console.log(client.channels.cache.get('609883567899672592').members);
    
    // const guildNames = guild.channels.cache.map(g => {
    //     console.log(g.name)});
    // console.log("Guild ID", guild.id);
    // const channel = guild.channels.cache.get("609883567899672592");
    // console.log(channel.guild.voiceAdapterCreator);
    
});
client.on('voiceStateUpdate', function (oldMember, newMember) {
	// console.log("oldMember", oldMember);
    const username = newMember.member.user.username
    
    console.log("newMember", newMember);
    
// Fire a callback once the text has completed being spoken

    say.export(`Bonjour ${username}`, 'Microsoft Zira Desktop', 1, 'hal.wav', (err) => {
        if (err) {
          return console.error(err)
        }
        const guild = client.guilds.cache.get("239827251540131851");
        const channel = guild.channels.cache.get("609883567899672592");
        const connection = joinVoiceChannel({
            channelId: "609883567899672592",
            guildId: "239827251540131851",
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        const resource = createAudioResource('hal.wav');
        connection.subscribe(player);
        console.log('Text has been saved to hal.wav.')
      })
});

// Login to Discord with your client's token
client.login(process.env.token);