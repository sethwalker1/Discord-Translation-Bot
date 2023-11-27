import { Events } from 'discord.js';
import Emoji from '../modules/Emoji/Emoji.mjs';
import Translate from '../modules/Translate/Translate.mjs';

export default {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial)
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      await reaction.fetch().catch(() => {});

    if (!reaction.message?.content) return;

    // Convert the emoji to a language code
    const targetLanguage = Emoji.emojiToLanguage(reaction.emoji.name);
    if (!targetLanguage) return;

    // Translate the message
    const { embed } =
      (await Translate.translate(reaction.message.content, targetLanguage)) ??
      {};

    if (!embed) return;

    // Send the response
    await reaction.message.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
