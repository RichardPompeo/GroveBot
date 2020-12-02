const { MessageEmbed } = require('discord.js')
const arrayUtils = require('../../build/extensions/ArrayUtils')
const { prefix } = require('../../build/json/Config.json')
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

  let songs = player.queue.map(track => track.title)

  let songsForPageContent = []
  var selectedPage = 1
  let page = arrayUtils.getPage(songs.length)
  var auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
  var songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

  songsForPage.map(response => {
    songsForPageContent.push(`${response.index}) ${response.song}`)
  })

  if (player.queue.length <= 0) songs = null

  if (songs === null) {
    songsForPageContent = `Não há musicas na fila :(\nUse ${prefix}add para adicionar mais músicas!`
    return message.channel.send(`**${messages.messages.nowPlaying}: ** \`${player.queue.current.title}\` \`\`\`css\n${songsForPageContent}\`\`\` `)
  }

  if (page === 1) {
    return message.channel.send(`**${messages.messages.nowPlaying}: ** \`${player.queue.current.title}\` \`\`\`css\n${songsForPageContent.join('\n')}\`\`\` `)
  }

  const msg = await message.channel.send(`**${messages.messages.nowPlaying}: ** \`${player.queue.current.title}\` \`\`\`css\n${songsForPageContent.join('\n')}\`\`\` `)
  await msg.react('⬆️')
  await msg.react('⬇️')

  const filtroForward = (r, u) => r.emoji.name === '⬇️' && u.id === message.author.id
  const coletorForward = msg.createReactionCollector(filtroForward, { dispose: true })

  const filtroBackward = (r, u) => r.emoji.name === '⬆️' && u.id === message.author.id
  const coletorBackward = msg.createReactionCollector(filtroBackward, { dispose: true })

  coletorForward.on('collect', () => forward())
  coletorForward.on('remove', () => forward())

  coletorBackward.on('collect', () => backward())
  coletorBackward.on('remove', () => backward())

  function forward() {
    if (selectedPage === page) {
      selectedPage = 1;
      songsForPageContent = []
    } else {
      selectedPage++
      songsForPageContent = []
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
    songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

    songsForPage.map(response => {
      songsForPageContent.push(`${response.index}) ${response.song}`)
    })

    msg.edit(`**${messages.messages.nowPlaying}: ** \`${player.queue.current.title}\` \`\`\`css\n${songsForPageContent.join('\n')}\`\`\` `)
  }

  function backward() {
    if (selectedPage === 1) {
      selectedPage = page;
      songsForPageContent = []
    } else {
      selectedPage--
      songsForPageContent = []
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(songs)
    songsForPage = arrayUtils.choosePage(auxArray, selectedPage)

    songsForPage.map(response => {
      songsForPageContent.push(`${response.index}) ${response.song}`)
    })

    msg.edit(`**${messages.messages.nowPlaying}: ** \`${player.queue.current.title}\` \`\`\`css\n${songsForPageContent.join('\n')}\`\`\` `)
  }
}

exports.help = {
  name: 'queue',
  aliases: ['lista', 'q', 'músicas', 'musicas', 'songs', 'musics', 'fila'],
  category: 'music'
}