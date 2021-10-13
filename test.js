const say = require('say')




// Fire a callback once the text has completed being spoken
say.speak("Bonjour Catherine", "Microsoft Zira Desktop", 1, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Text has been spoken.')
});


say.getInstalledVoices(function(err,voices) {
    console.log(voices);
})