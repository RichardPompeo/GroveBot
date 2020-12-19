const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message) => {
  const embed = new MessageEmbed()
    .setColor(message.guild.me.roles.highest.color)
    .setAuthor(message.guild.me.user.username, message.guild.me.user.avatarURL())
    .addFields(
      { name: 'Sobre', value: 'Sou um bot Brasileiro com suporte a diversas plataformas de Streaming!', inline: false },
      { name: 'WebSite', value: 'Em meu site você pode saber mais sobre mim! [Clique aqui](https://grovebot.tk)', inline: false },
      { name: 'Comandos', value: 'Para ver minha lista de comandos, [clique aqui!](https://grovebot.tk/commands)', inline: false }
    )
  message.channel.send(embed)
}

exports.help = {
  name: 'help',
  aliases: ['ajuda', 'commands', 'comandos', 'commandslist'],
  category: 'miscellaneous'
}