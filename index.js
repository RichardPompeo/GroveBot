const Discord = require('discord.js')
const bot = new Discord.Client({ disableMentions: "everyone" })
const fs = require('fs')
const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const config = require('./src/build/json/Config.json')
const messages = require('./src/build/json/Messages.json')
const glob = require('glob')

const clientID = config.clientID
const clientSecret = config.clientSecret
const host = config.host
const password = config.password
const identifier = config.identifier

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

glob(__dirname + '/src/commands/*/*.js', function (err, files) {
  if (err) console.log(err)
  files.forEach(f => {
    let props = require(f.replace('.js', ''))
    bot.commands.set(props.help.name, props)
    for (const aliase of props.help.aliases) {
      bot.aliases.set(aliase, props)
    }
  })
})

fs.readdir("./src/events/", (err, files) => {
  if (err) console.log(err)
  const eventsFiles = files.filter(file => file.split('.').pop() == 'js')
  if (eventsFiles.length <= 0) return
  eventsFiles.forEach((file) => {
    require('./src/events/' + file)
  })
})

require('./src/build/extensions/Player')
bot.manager = new Manager({
  nodes: [{
    host: host,
    password: password,
    retryDelay: 5000,
    identifier: identifier
  }],
  plugins: [new Spotify({ clientID, clientSecret })],
  autoPlay: true,
  send: (id, payload) => {
    const guild = bot.guilds.cache.get(id)
    if (guild) guild.shard.send(payload)
  }
})

  .on('nodeConnect', node => {
    console.log(`[NODE] - ${node.options.identifier} conectado.`)
  })

  .on('nodeError', (node, error) => {
    console.log(`[NODE] - Erro: ${error.message}.`)
  })

  .on('trackStart', (player, track) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(messages.messages.nowPlaying)
      .setDescription(`[${track.title}](${track.uri})`)
      .setColor(bot.guilds.cache.get(player.guild).me.roles.highest.color)
    bot.channels.cache.get(player.textChannel)
      .send(embed)
      .then(msg => {
        player.set("message", msg)
      })
  })

  .on('socketClosed', (player, payload) => {
    if (payload.byRemote == true) {
      player.destroy()
    }
  })

  .on('trackEnd', player => {
    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete()
    }
  })

  .on('trackStuck', (player, track, payload) => {
    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete()
    }
    let embed = new Discord.MessageEmbed()
      .setDescription(messages.messages.systemError)
      .setColor(bot.guilds.cache.get(player.guild).me.roles.highest.color)
    bot.channels.cache.get(player.textChannel)
      .send(embed)
  })

  .on('trackError', (player, track, payload) => {
    if (!player.get("message")) {
      return
    }
    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete()
    }
    let embed = new Discord.MessageEmbed()
      .setDescription(messages.messages.systemError)
      .setColor(bot.guilds.cache.get(player.guild).me.roles.highest.color)
    bot.channels.cache.get(player.textChannel)
      .send(embed)
  })

  .on('playerMove', (player, currentChannel, newChannel) => {
    player.voiceChannel = bot.channels.cache.get(newChannel);
  })

  .on('queueEnd', player => {
    let embed = new Discord.MessageEmbed()
      .setDescription(messages.messages.queueEnd)
      .setColor(bot.guilds.cache.get(player.guild).me.roles.highest.color)
    bot.channels.cache.get(player.textChannel)
      .send(embed)
    player.destroy()
  })

bot.once('ready', () => {
  bot.manager.init(bot.user.id)
})

bot.on('raw', d => {
  bot.manager.updateVoiceState(d)
})

bot.login(config.token)

module.exports = {
  bot,
  Manager
}