const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		// In a real application, you would fetch the server's configuration
    // from a database that the dashboard writes to. This is a placeholder.
    const serverConfig = {
      welcomeEnabled: true, // This would be read from your database
      welcomeChannelId: 'YOUR_WELCOME_CHANNEL_ID_HERE', // This would be read from your database
      welcomeMessage: 'Welcome {user} to the server! Enjoy your stay.', // This would be read from your database
    };

    if (!serverConfig.welcomeEnabled) return;

    const channel = member.guild.channels.cache.get(serverConfig.welcomeChannelId);
    if (!channel) {
      console.log(`Welcome channel with ID ${serverConfig.welcomeChannelId} not found!`);
      return;
    }

    const message = serverConfig.welcomeMessage
      .replace('{user}', member.toString())
      .replace('{server}', member.guild.name);
            
    try {
      await channel.send(message);
    } catch (error) {
      console.error(`Could not send welcome message to channel ${serverConfig.welcomeChannelId}:`, error);
    }
	},
};
