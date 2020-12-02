const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../build/json/Config.json')
const messages = require('../../build/json/Messages.json')

module.exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;
  const color = message.guild.me.roles.highest.color

  if (!channel) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.noChannel)
    return message.channel.send(embed)
  }

  if (!args.length) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(messages.messages.incorrectUse)
      .setDescription(`${prefix}${messages.messages.noSearch}`)
    return message.channel.send(embed)
  }

  let play = message.client.manager.players.get(message.guild.id)

  if (!play) {
    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    })

    if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(messages.messages.error)
        .setDescription(messages.messages.cannotJoin)
      return message.channel.send(embed)
    }

    player.connect()
  }

  const player = message.client.manager.players.get(message.guild.id)

  if (player.options.voiceChannel !== channel.id) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription(messages.messages.differentChannel + ' ' + `\`${channel.name}\``)
    return message.channel.send(embed)
  }

  const search = args.join(' ')
  let res

  try {
    res = await player.search(search, message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      throw new Error(res.exception.message)
    }
  } catch (err) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(messages.messages.error)
      .setDescription(messages.messages.noResults + ' ' + `\`${search}\``)
    return message.channel.send(embed)
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      if (!player.queue.current) player.destroy()
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(messages.messages.error)
        .setDescription(messages.messages.noResults + ' ' + `\`${search}\``)
      return message.channel.send(embed)

    case 'TRACK_LOADED':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      let embed2 = new MessageEmbed()
        .setColor(color)
        .setDescription(messages.messages.queued + ' ' + `[${res.tracks[0].title}](${res.tracks[0].uri})`)
      if (player.queue.length >= 1) message.channel.send(embed2)
      return

    case 'PLAYLIST_LOADED':
      await player.queue.add(res.tracks)
      if (!player.playing && !player.paused && player.queue.size + 1 === res.tracks.length) player.play();
      let embed3 = new MessageEmbed()
        .setColor(color)
        .setDescription(messages.messages.queued + ' ' + `[${res.playlist.name}](${res.tracks[0].uri}) \`[${res.tracks.length} músicas]\``)
      return message.channel.send(embed3)

    case 'SEARCH_RESULT':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      let embed4 = new MessageEmbed()
        .setColor(color)
        .setDescription(messages.messages.queued + ' ' + `[${res.tracks[0].title}](${res.tracks[0].uri})`)
      if (player.queue.length >= 1) message.channel.send(embed4)
      return;
  }
}

exports.help = {
  name: 'play',
  aliases: ['tocar', 'p', 'ouvir', 'add', 'adicionar'],
  category: 'music'
}