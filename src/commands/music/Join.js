const { MessageEmbed } = require('discord.js')
const messages = require('../../build/json/Messages.json')

module.exports.run = (bot, message, args) => {
  const color = message.guild.me.roles.highest.color
  const { channel } = message.member.voice

  if (!channel) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.noChannel)
    return message.channel.send(embed)
  }

  if (message.guild.me.voice.channel && message.guild.me.voice.channel.id !== channel.id) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.differentChannel + ' ' + `\`${message.guild.me.voice.channel.name}\``)
    return message.channel.send(embed)
  }

  if (!message.guild.me.voice.channel) {
    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });

    if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(messages.messages.error)
        .setDescription(messages.messages.cannotJoin)
      return message.channel.send(embed)
    }

    player.connect()
    return message.react('🎵');
  }
}

exports.help = {
  name: 'join',
  aliases: ['conectar', 'entrar', 'connect'],
  category: 'music'
}