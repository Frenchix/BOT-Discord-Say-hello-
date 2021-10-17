const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus } = require('@discordjs/voice');
const say = require('say');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = createAudioPlayer();

function playSong() {
	const resource = createAudioResource('hal.wav');
	player.play(resource);
	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel() {
    const guild = client.guilds.cache.get("239827251540131851");
    const channel = guild.channels.cache.get("609883567899672592");
	const connection = joinVoiceChannel({
        channelId: "609883567899672592",
        guildId: "239827251540131851",
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');  
});

client.on('voiceStateUpdate', function (oldMember, newMember) {
    if (newMember.member.user.bot || newMember.channelId !== '609883567899672592') {
        return;
    }
    const username = newMember.member.user.username
    
    // console.log("newMember", newMember.member.voice.channel);
    
// Fire a callback once the text has completed being spoken

    say.export(`Bonjour ${username}`, 'Microsoft Zira Desktop', 1, 'hal.wav', async (err) => {
        if (err) {
          return console.error(err)
        }
        var connection = await connectToChannel();
        playSong();
        setTimeout(function(){ connection.subscribe(player); }, 2000); ;

        console.log('Text has been saved to hal.wav.')
      })
    //   say.getInstalledVoices(function(err, voices) {
    //       console.log(voices);
    //   }); 
});

player.on(AudioPlayerStatus.Idle, async () => {
    var connection = await connectToChannel();
    connection.destroy();
	console.log('The audio player has stop!');
});

// Login to Discord with your client's token
client.login(process.env.token);