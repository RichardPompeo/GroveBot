const { ShardingManager, MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./src/build/json/Config.json')
const messages = require('./src/build/json/Messages.json')
const shard = new ShardingManager('./index.js', {
  totalShards: 3,
  respawn: true,
  token: config.token
});

shard.on('shardCreate', shard => {
  let hook = new WebhookClient(config.hook.id, config.hook.token)

  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(messages.messages.shardCreate)
    .setDescription(`Shard \`${shard.id}\` iniciada com sucesso.`)
    .setTimestamp()

  hook.send(embed)
})

shard.spawn()