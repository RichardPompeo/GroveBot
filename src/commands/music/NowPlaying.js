const { MessageEmbed } = require('discord.js')
const { porgressBar } = require("music-progress-bar");
const { time2 } = require('../../build/extensions/Utils')
const messages = require('../../build/json/Messages.json')

module.exports.run = (bot, message) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!player) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.noPlayer)
    return message.channel.send(embed)
  }

  const { title, author, duration, uri } = player.queue.current

  const progressBar = porgressBar({
    currentPositon: player.position > 0 ? player.position : "1",
    endPositon: duration, 
    width: 15, 
    barStyle: "▬",
    currentStyle: player.playing ? "▶️" : "⏸️"
  },
    {
      format: " **[ <bar> ]** "
    })

  let embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(author, message.author.avatarURL({ dynamic: true }))
    .setTitle(title)
    .setURL(uri)
    .setDescription(`${progressBar} \`${player.position <= 60000 ? `${time2(player.position)}s` : time2(player.position)} / ${time2(duration)}\``)
  return message.channel.send(embed)
}

exports.help = {
  name: 'np',
  aliases: ['tocando', 'nowplaying', 'now-playing', 'playing'],
  category: 'music'
}