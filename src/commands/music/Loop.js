const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../build/json/Config.json')
const messages = require('../../build/json/Messages.json')

module.exports.run = (bot, message, args) => {
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

  if (args[0] && args[0].toLowerCase() == 'song') {
    if (player.trackRepeat == false) {
      player.setTrackRepeat(true)
      return message.react('🔂')
    } else {
      player.setTrackRepeat(false)
      return message.react('❌')
    }
  }

  if (args[0] && args[0].toLowerCase() == 'queue') {
    if (player.queueRepeat == false) {
      player.setQueueRepeat(true)
      return message.react('🔁')
    } else {
      player.setQueueRepeat(false)
      return message.react('❌')
    }
  }

  if (!args[0] || args[0].toLowerCase() != 'song' || args[0].toLowerCase() != 'queue') {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(messages.messages.incorrectUse)
      .setDescription(`${prefix}${messages.messages.noArgs}`)
    return message.channel.send(embed)
  }
}

exports.help = {
  name: 'loop',
  aliases: ['repetir', 'repeat', 'looping'],
  category: 'music'
}