const { bot } = require('../../index')

bot.on('guildDelete', async () => {
  let servidores = await bot.shard.fetchClientValues('guilds.cache.size')
  let total_servers = servidores.reduce((prev, val) => prev + val)
  bot.channels.cache.get(config.servers).setName(`🌐 Servidores: ${total_servers}`)
})