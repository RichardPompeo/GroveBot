const { MessageEmbed, splitMessage } = require('discord.js')
const { prefix } = require('../../build/json/Config.json')
const messages = require('../../build/json/Messages.json')
const lyricsFinder = require("lyrics-finder")

module.exports.run = async (bot, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
  const embed = new MessageEmbed().setColor(message.guild.me.roles.highest.color)

  let lyrics;
  let search;

  if (args[0]) {
    search = args.join(' ')
  }

  if (!args[0] && !player) {
    embed
      .setTitle(messages.messages.incorrectUse)
      .setDescription(prefix + messages.messages.lyrics)
    return message.channel.send(embed)
  }

  if (!args[0] && player.queue.current) {
    search = player.queue.current.title
  }

  embed
    .setDescription(messages.messages.searchingLyrics)
  const msg = await message.channel.send(embed)

  try {
    lyrics = await lyricsFinder(search, "")
    if (!lyrics) lyrics = `${messages.messages.cannotSearchLyrics} \`${search}\``
  } catch (err) {
    lyrics = `${messages.messages.cannotSearchLyrics} \`${search}\``
  }

  embed
    .setDescription(lyrics)

  if (embed.description != `${messages.messages.cannotSearchLyrics} \`${search}\``) {
    embed.setTitle(search)
    if (player && !args[0]) embed.setURL(player.queue.current.uri)
  }

  const splitDescription = splitMessage(lyrics, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: ""
  });

  splitDescription.forEach(async (m) => {
    embed.setDescription(m);
    message.channel.send(embed);
  });

  return msg.delete()
}

exports.help = {
  name: 'lyrics',
  aliases: ['letra', 'letras'],
  category: 'music'
}