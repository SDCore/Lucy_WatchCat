const fs = require('fs');
const chalk = require('chalk');
const { Collection, ActivityType } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {
		const channelID = message.channelId;
		const banChannelID = process.env.DONT_TYPE_HERE_CHANNEL;
		const banLogChannel = await client.channels.fetch(process.env.BAN_LOG_CHANNEL);

		// Ignore if staff
		if (message.member.roles.cache.some(role => role.name === 'Staff')) return;

		// Ignore if not in the "dont-type-here" channel
		if (channelID !== banChannelID) return;

		// Ban user if they type in the channel
		await message.member.ban({ reason: `Likely bot, typed in honeypot channel.`, deleteMessageSeconds: 60 * 60 * 24 });
		await banLogChannel.send(`User <@${message.author.id}> has been banned for typing in <#${process.env.DONT_TYPE_HERE_CHANNEL}>.\nMessage: \`${message.content}\``);
		console.log(`${chalk.red.bold('[WatchCat]')} User ${message.author.tag} (${message.author.id}) has been banned for typing in the honeypot channel`);
	},
};
