const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message) => {
  const embed = new MessageEmbed()
    .setColor(message.guild.me.roles.highest.color)
    .setTitle(`Grove Ajuda`)
    .setDescription(
      `
      Olá ${message.author},
      para ver minha lista de comandos acesse https://grovebot.vercel.app/index.html#navbar,
      você também pode pegar em meu site o convite do meu servidor de suporte e o link para me adicionar!
      Para acessar meu site acesse https://grovebot.vercel.app
      `
    )
  message.channel.send(embed)
}

exports.help = {
  name: 'help',
  aliases: ['ajuda', 'commands', 'comandos', 'commandslist'],
  category: 'miscellaneous'
}