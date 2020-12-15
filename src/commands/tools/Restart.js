const Discord = require('discord.js')
const { bot } = require('../../../index')
const utils = require('../../build/extensions/Utils')

module.exports.run = async (bots, message, args) => {
  if (!utils.eval.includes(message.author.id)) return;

  if (!args[0]) {
    return process.exit(1)
  }

  if (args[0]) {
    return bot.shard.respawnAll()
  }
}

exports.help = {
  name: 'restart',
  aliases: ['reiniciar'],
  category: 'tools'
}