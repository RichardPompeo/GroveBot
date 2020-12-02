const { MessageEmbed } = require('discord.js')
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

  const { channel } = message.member.voice

  if (!channel) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.noChannel)
    return message.channel.send(embed)
  }

  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.differentChannel + ' ' + `\`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
    return message.channel.send(embed)
  }

  if (player.paused) {
    player.pause(false)
    return message.react('⏸️')
  } else if (!player.paused) {
    player.pause(true)
    return message.react('▶️')
  }
}

exports.help = {
  name: 'pause',
  aliases: ['unpause', 'pausar', 'resumir', 'resume', 'despausar'],
  category: 'music'
}