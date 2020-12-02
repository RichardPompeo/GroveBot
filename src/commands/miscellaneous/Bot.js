const { MessageEmbed } = require("discord.js")
const { bytes, time } = require('../../build/extensions/Utils')
const os = require('os')

module.exports.run = async (bot, message) => {
  let servers = await bot.shard.fetchClientValues('guilds.cache.size')
  let mem = await bot.shard.broadcastEval(`process.memoryUsage().rss`)

  let totalServers = servers.reduce((prev, val) => prev + val)
  let totalMem = mem.reduce((prev, val) => prev + val)

  const embed = new MessageEmbed()
    .setColor(message.guild.me.roles.highest.color)
    .setTitle('Informações')
    .addFields(
      { name: 'Equipe', value: `<@389866221295763456>, <@449240801520779266> e <@599563864509513739>`, inline: false },
      { name: "Me adicione", value: `[Clique aqui](https://discord.com/oauth2/authorize?client_id=712785958231080990&scope=bot&permissions=8)`, inline: true },
      { name: "Servidor de suporte", value: '[Clique aqui](https://discord.gg/wDPvreyZTU)', inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: "Servidores", value: totalServers.toLocaleString("pt-br"), inline: true },
      { name: "Shards", value: bot.shard.count, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: "Memória", value: `${bytes(totalMem).value}${bytes(totalMem).unit} / ${bytes(os.totalmem()).value}${bytes(os.totalmem()).unit}`, inline: true },
      { name: 'Ping', value: `${bot.ws.ping}ms`, inline: true },
      { name: "Uptime", value: time(bot.uptime), inline: false },
    )
  return message.channel.send(embed)
}

exports.help = {
  name: 'bot',
  aliases: ['botinfo', 'about', 'info', 'invite', 'invites', 'convite', 'convites'],
  category: 'miscellaneous'
}