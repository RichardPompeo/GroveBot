const { bytes, time } = require('../../build/extensions/Utils')
const AsciiTable = require('ascii-table')
table = new AsciiTable('Shards - Informações')

module.exports.run = async (bot, message) => {
  table.setHeading('Shard ID', 'UpTime', 'Ping', 'Memória', 'Servidores', 'Players')
  table.setAlign(0, AsciiTable.CENTER)
  table.setAlign(1, AsciiTable.CENTER)
  table.setAlign(2, AsciiTable.CENTER)
  table.setAlign(3, AsciiTable.CENTER)
  table.setAlign(4, AsciiTable.CENTER)
  table.setAlign(5, AsciiTable.CENTER)
  table.setBorder('|', '-', '+', '+')

  let servers = await bot.shard.fetchClientValues('guilds.cache.size')
  let mem = await bot.shard.broadcastEval(`process.memoryUsage().rss`)
  let ping = await bot.shard.fetchClientValues('ws.ping')
  let uptime = await bot.shard.fetchClientValues('uptime')
  let players = await bot.shard.fetchClientValues('manager.players.size')

  for (let i = 0; i < bot.options.shardCount; i++) {
    table.addRow(i === message.guild.shard.id ? i + '*' : i,
      time(uptime[i]), '~' + ping[i] + 'ms',
      bytes(mem[i]).value + bytes(mem[i]).unit,
      servers[i].toLocaleString('pt-br'),
      players[i].toLocaleString('pt-br')
    )
  }

  let totalServers = servers.reduce((prev, val) => prev + val)
  let totalMem = mem.reduce((prev, val) => prev + val)
  let pingMedia = ping.reduce((prev, val) => prev + val)
  let media = pingMedia / bot.options.shardCount
  let totalPlayers = players.reduce((prev, val) => prev + val)

  table.addRow('______', '______', '______', '______', '______', '______')

  table.addRow('TOTAL', '-', '~' +
    Math.round(media) + 'ms',
    bytes(totalMem, 2).value + bytes(totalMem, 2).unit,
    totalServers.toLocaleString('pt-BR'),
    totalPlayers
  )

  message.channel.send(table.toString(), { code: 'apache' })
  return table.clearRows()
}

exports.help = {
  name: 'shard',
  aliases: ['shardinfo', 'infoshard', 'shards'],
  category: 'miscellaneous'
}