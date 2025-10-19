const { SlashCommandBuilder } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This would ideally read from a database/config file that the dashboard updates.
// For now, it's a hardcoded placeholder.
const systemInstruction = 'You are a helpful and friendly assistant in a Discord server.';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask-ai')
		.setDescription('Ask a question to the AI assistant.')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('The question you want to ask')
				.setRequired(true)),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');
		
		await interaction.deferReply();

		try {
            if (!process.env.API_KEY) {
                await interaction.editReply('The Gemini API key is not configured. AI features are disabled.');
                return;
            }
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    // In a real app, you would fetch this system instruction from a database 
                    // that is updated by the web dashboard.
                    systemInstruction: systemInstruction, 
                },
            });

			const textResponse = response.text;
			await interaction.editReply(`**You asked:** ${prompt}\n\n**AI says:** ${textResponse}`);
		} catch (error) {
			console.error('Error with Gemini API:', error);
			await interaction.editReply('Sorry, there was an error getting a response from the AI.');
		}
	},
};
