const { bot } = require("../../index");
const { MessageEmbed, WebhookClient } = require("discord.js")
const config = require('../build/json/Config.json')
const messages = require('../build/json/Messages.json')

bot.on('shardDisconnect', (event, shardID) => {
  let hook = new WebhookClient(config.hook.id, config.hook.token)

  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle(messages.messages.shardDisconnect)
    .setDescription(`Shard \`${shardID}\` desconectada.`)
    .setTimestamp()

  hook.send(embed)
})