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

  if (player.nightcore == false) {
    player.setNightcore(true)
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.nightcoreOn)
    return message.channel.send(embed)
  }

  if (player.nightcore == true) {
    player.setBassboost(true)
    player.setBassboost(false)
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.nightcoreOff)
    return message.channel.send(embed)
  }
}

exports.help = {
  name: 'nightcore',
  aliases: ['night', 'nigthcore', 'nigth'],
  category: 'effects'
}