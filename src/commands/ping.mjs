import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import Command from '../modules/Command.mjs';

const __filename = fileURLToPath(import.meta.url);

export default new (class PingCommand extends Command {
  constructor() {
    super(
      __filename,
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
    );
  }

  async execute(interaction) {
    // Defer the reply to let the user know the bot is working
    await interaction.deferReply({ ephemeral: true });

    // Reply with the result
    let content = `Pong!`;
    await interaction.editReply({
      content,
      ephemeral: true,
    });

    // Return the result for logging
    return content;
  }
})();
