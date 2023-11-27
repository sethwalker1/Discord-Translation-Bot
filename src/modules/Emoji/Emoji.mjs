import fs from 'fs';

export default class Emoji {
  static emojiToCountryMap = JSON.parse(
    fs.readFileSync('./src/modules/Emoji/Emoji.json')
  );
  static countriesToLanguageMap = JSON.parse(
    fs.readFileSync('./src/modules/Emoji/Countries.json')
  );

  static emojiToLanguage(emoji) {
    // Check if emoji is a valid country flag
    if (!emoji) return null;

    // Convert emoji to country code
    const country = this.emojiToCountryMap[emoji];
    if (!country) return null;

    // Convert country code to language
    const language = this.countriesToLanguageMap[country];
    if (!language) return null;

    // Return the language
    return language;
  }
}
