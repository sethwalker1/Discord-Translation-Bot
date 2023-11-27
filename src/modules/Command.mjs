import path from 'path';

export default class Command {
  extname = path.extname(import.meta.url);

  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  async execute(interaction) {
    // Defer the reply to let the user know the bot is working
    await interaction.deferReply({ ephemeral: true });

    // Build a path to the target subcommand module
    const file = interaction.options.getSubcommand() + this.extname;
    const folderPath = path.join(process.cwd(), 'src/commands/subcommands');
    const subcommandPath = path.join(folderPath, this.name, file);

    // Import the target subcommand module
    const { default: subcommand } = await import(`file://${subcommandPath}`);
    const content = await subcommand.execute(interaction);

    // Reply with the subcommand's result
    await interaction.editReply({
      content,
      ephemeral: true,
    });

    // Return the result for logging
    return content;
  }
}
