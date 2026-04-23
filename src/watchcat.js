const chalk = require('chalk');
const dotenv = require('dotenv');
const { loadEvents } = require('./events.js');
const { Client, GatewayIntentBits } = require('discord.js');

dotenv.config({ quiet: true });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });

client
	.login(process.env.DISCORD_TOKEN)
	.then(() => {
		loadEvents(client);
	})
	.catch(err => {
		if (!err.statusText) {
			console.error(chalk.red(`${chalk.bold('[BOT]')} Error logging into Discord: ${err}`));
		} else {
			console.error(chalk.red(`${chalk.bold('[BOT]')} Error logging into Discord: ${err.statusText}`));
		}
	});

module.exports = { client };
