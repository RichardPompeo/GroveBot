const { MessageEmbed } = require('discord.js')
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
    .setDescription(`1️⃣ - 0.25x
    2️⃣ - 0.50x
    3️⃣ - 1.00x (Padrão)
    4️⃣ - 1.50x
    5️⃣ - 2.00x`)
    .setTitle(messages.messages.speed)
  const msg = await message.channel.send(embed)
  await msg.react('1️⃣')
  await msg.react('2️⃣')
  await msg.react('3️⃣')
  await msg.react('4️⃣')
  await msg.react('5️⃣')

  const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id
  const reactions = await msg.awaitReactions(filter, { max: 1 })
  const choice = reactions.get('1️⃣') || reactions.get('2️⃣') || reactions.get('3️⃣') || reactions.get('4️⃣') || reactions.get('5️⃣')

  if (choice.emoji.name === '1️⃣') player.setSpeed(0.25)
  if (choice.emoji.name === '2️⃣') player.setSpeed(0.50)
  if (choice.emoji.name === '3️⃣') player.setSpeed(1.00)
  if (choice.emoji.name === '4️⃣') player.setSpeed(1.50)
  if (choice.emoji.name === '5️⃣') player.setSpeed(2.00)

  let embed2 = new MessageEmbed()
    .setColor(color)
    .setDescription(messages.messages.speedSetTo + ' ' + player.speed + '.')
  return message.channel.send(embed2)
}

exports.help = {
  name: 'speed',
  aliases: ['vel', 'velocidade'],
  category: 'effects'
}