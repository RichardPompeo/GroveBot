const { MessageEmbed } = require("discord.js");
const messages = require('../../build/json/Messages.json')

module.exports.run = async (bot, message) => {
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

  let embed = new MessageEmbed()
    .setColor(color)
    .setTitle(messages.messages.effects)
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addFields(
      { name: 'BassBoost', value: player.bassboost ? 'Ativado': 'Desativado', inline: true },
      { name: 'Distortion', value: player.distortion ? 'Ativado': 'Desativado', inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'NightCore', value: player.nightcore ? 'Ativado': 'Desativado', inline: true },
      { name: 'VaporWave', value: player.vaporwave ? 'Ativado': 'Desativado', inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Speed', value: player.speed, inline: false }
    )
  return message.channel.send(embed)
}

exports.help = {
  name: 'effects',
  aliases: ['effect', 'efeito', 'efeitos'],
  category: 'miscellaneous'
}