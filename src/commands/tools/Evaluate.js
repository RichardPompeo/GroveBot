const Discord = require('discord.js')
const config = require('../../build/json/Config.json')
const messages = require('../../build/json/Messages.json')
const utils = require('../../build/extensions/Utils')

module.exports.run = async (bot, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!utils.eval.includes(message.author.id)) return

  try {
    if (!args.join(' ')) return

    let code = await eval(args.join(' '))
    if (typeof code != 'string') {
      code = await require('util').inspect(code, { depth: 0 })
    }

    let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Evaluate')
      .addField('Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField('Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)

    if (code.length > 1010) {
      embed.addField('Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
    }

    message.channel.send(embed)
  } catch (err) {
    let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Erro')
      .setDescription(`\`\`\`js\n${err}\`\`\``)
    return message.channel.send(embed)
  }
}

exports.help = {
  name: 'eval',
  aliases: ['evaluate', 'ev'],
  category: 'tools'
}