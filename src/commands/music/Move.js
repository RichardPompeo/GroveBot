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

  if (!args[0] || !args[1]) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(messages.messages.incorrectUse)
      .setDescription(`${prefix}${messages.messages.noArgsMove}`)
    return message.channel.send(embed)
  }

  if (isNaN(args[0]) || isNaN(args[1])) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${messages.messages.isnanMove}`)
    return message.channel.send(embed)
  }

  if (args[0] > player.queue.length || args[0] <= 0 || args[1] > player.queue.length || args[1] <= 0) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${messages.messages.invalidMove}`)
    return message.channel.send(embed)
  }

  let embed = new MessageEmbed()
    .setColor(color)
    .setDescription(messages.messages.moved + ' ' + `**[${player.queue[args[0] - 1].title}](${player.queue[args[0] - 1].uri})**` + ' ' + messages.messages.to + ' ' + args[1] + '.')

  const element = player.queue[args[0] - 1]
  player.queue.splice(args[0] - 1, 1)
  player.queue.splice(args[1] - 1, 0, element)

  return message.channel.send(embed)
}

exports.help = {
  name: 'move',
  aliases: ['mover', 'posicionar', 'trocar'],
  category: 'music'
}