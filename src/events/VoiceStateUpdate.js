const { bot } = require("../../index");
const { MessageEmbed } = require("discord.js")
const messages = require('../build/json/Messages.json')

bot.on('voiceStateUpdate', async (oldState, newState) => {
  const player = bot.manager.players.get(newState.guild.id)
  if (!player) return;

  if (bot.guilds.cache.get(player.options.guild).channels.cache.get(player.options.voiceChannel).members.size == 1) {
    const embed = new MessageEmbed()
      .setColor(newState.guild.me.roles.highest.color)
      .setDescription(messages.messages.disconnecting)
    bot.channels.cache.get(player.textChannel)
      .send(embed)
    return player.destroy()
  }

  if (oldState.channel) {
    let entry = await oldState.channel.guild.fetchAuditLogs({
      type: 'MEMBER_DISCONNECT'
    }).then(audit => audit.entries.first())
    if (entry.id != bot.user.id) return;
    oldState.channel.join()
  }
})