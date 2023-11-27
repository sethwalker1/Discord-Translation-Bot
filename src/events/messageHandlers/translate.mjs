import Translate from '../../modules/Translate/Translate.mjs';

export default async message => {
  const { content } = message;

  // Translate any non-English message to English
  if (message.author.bot) return null;

  // Translate the message
  const { text, embed } = (await Translate.translate(content, 'en')) ?? {};

  // If the message couldn't be translated, don't send a response
  if (!text || !embed) return;

  // Send the response
  await message.reply({
    embeds: [embed],
    allowedMentions: { repliedUser: false },
  });
};
