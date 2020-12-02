const { bot } = require('../../index')
const { MessageEmbed } = require("discord.js");
const { prefix } = require('../build/json/Config.json')

bot.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let messageArray = message.content.split(' ')
  let cmd = messageArray[0]
  let args = messageArray.slice(1);
  let commandFile = bot.commands.get(cmd.slice(prefix.length));

  if (message.content.startsWith('<@') && message.content.endsWith(bot.user.id + '>')) {
    let embed = new MessageEmbed()
      .setColor(message.guild.me.roles.highest.color)
      .setDescription(`Olá ${message.author}, digite **${prefix}ajuda** para ver a lista de comandos.`)
    message.channel.send(embed)
  }

  if (!message.content.startsWith(prefix)) return;

  if (!commandFile) {
    commandFile = bot.aliases.get(cmd.slice(prefix.length).toLowerCase())
  }
  
  if (commandFile) {
    commandFile.run(bot, message, args);
  }
})