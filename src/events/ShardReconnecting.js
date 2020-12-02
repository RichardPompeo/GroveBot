const { bot } = require("../../index");
const { MessageEmbed, WebhookClient } = require("discord.js")
const config = require('../build/json/Config.json')
const messages = require('../build/json/Messages.json')

bot.on('shardReconnecting', (event, shardID) => {
  let hook = new WebhookClient(config.hook.id, config.hook.token)

  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(messages.messages.shardReconnecting)
    .setDescription(`Shard \`${shardID}\` reconectada com sucesso.`)
    .setTimestamp()

  hook.send(embed)
})