const fs = require('fs');
const chalk = require('chalk');
const { Collection, ActivityType } = require('discord.js');

module.exports = {
	name: 'clientReady',
	once: true,
	async execute(client) {
		console.log(`${chalk.green.bold('[WatchCat]')} Discord gateway connection established. Logged in as ${client.user.username}`);

		function updatePresence() {
			client.user.setActivity(`MEWOW (ban noises)`, { type: ActivityType.Custom });
		}

		updatePresence();
		setInterval(updatePresence, 1000 * 60 * 60 * 12);
	},
};
