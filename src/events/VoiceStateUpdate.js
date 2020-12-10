const { bot } = require("../../index");
const { MessageEmbed } = require("discord.js")

bot.on('voiceStateUpdate', async (oldState, newState) => {
  const player = bot.manager.players.get(newState.guild.id)
  if (!player) return;

  if (bot.guilds.cache.get(player.options.guild).channels.cache.get(player.options.voiceChannel).members.size == 1) {
    player.pause(true);
  }

  if (bot.guilds.cache.get(player.options.guild).channels.cache.get(player.options.voiceChannel).members.size >= 2) {
    if (player.paused) {
      player.pause(false);
    }
  }

  if (oldState.channel) {
    let entry = await oldState.channel.guild.fetchAuditLogs({
      type: 'MEMBER_DISCONNECT'
    })
      .then(audit =>
        audit.entries.first()
      )
    if (entry.id != bot.user.id) return;
    oldState.channel.join()
  }
})