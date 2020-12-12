const { bot } = require('../../index')
const config = require ('../build/json/Config.json')

bot.on('guildCreate', async () => {
  let servidores = await bot.shard.fetchClientValues('guilds.cache.size')
  let total_servers = servidores.reduce((prev, val) => prev + val)
  bot.channels.cache.get(config.servers).setName(`🌐 Servidores: ${total_servers}`)
})