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

  if (!args.length) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(messages.messages.incorrectUse)
      .setDescription(`${prefix}${messages.messages.noRemoveArgs}`)
    return message.channel.send(embed)
  }

  if (isNaN(args[0])) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.isnanRemove)
    return message.channel.send(embed)
  }

  if (args[0] > player.queue.length || args[0] <= 0) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.noQueueLength)
    return message.channel.send(embed)
  }

  player.queue.splice(args[0] - 1, 1) 
  return message.react('✅')
}

exports.help = {
  name: 'remove',
  aliases: ['remover', 'retirar', 'tirar'],
  category: 'music'
}