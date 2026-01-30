import { EmbedBuilder } from 'discord.js';
import DetectLanguage from 'detectlanguage';
import Microsoft from './Microsoft.mjs';
import DeepL from './DeepL.mjs';
import Pirate from './Pirate.mjs';
import { normalize } from '../Miscellaneous.mjs';

export default class Translate {
  static languageCodes = {
    pirate: 'Pirate',
  };

  static async initEngines() {
    await DeepL.getSupportedLanguages();
    await Microsoft.getSupportedLanguages();
  }

  static async anyLimitReached() {
    const detectLanguage = new DetectLanguage(
      process.env.DETECT_LANGUAGE_TOKEN,
    );

    const {
      requests,
      bytes,
      daily_requests_limit: dailyRequestsLimit,
      daily_bytes_limit: dailyBytesLimit,
    } = await detectLanguage.accountStatus();

    return requests >= dailyRequestsLimit || bytes >= dailyBytesLimit;
  }

  static async checkLanguage(text) {
    // Check if daily request/byte limit is reached
    if (await this.anyLimitReached()) return null;

    const detectLanguage = new DetectLanguage(
      process.env.DETECT_LANGUAGE_TOKEN,
    );

    return (await detectLanguage.detect(text))
      .filter(item => item.isReliable)
      .map(item => item.language)
      .pop();
  }

  static async translate(inputText, targetLanguage) {
    // DeepL doesn't support 'en' as a target language
    const deeplTargetLanguage =
      targetLanguage === 'en' ? 'en-US' : targetLanguage;

    // Check the source language
    let detectedSourceLanguage = await this.checkLanguage(inputText);

    let result;
    if (targetLanguage === 'pirate') {
      // Translate to English first if the source language is not English
      if (detectedSourceLanguage != 'en')
        ({ text: inputText, detectedSourceLanguage } = await this.translate(
          inputText,
          'en',
        ));

      // Translate to Pirate
      result = {
        text: await Pirate.translate(inputText),
        detectedSourceLanguage,
        engine: Pirate,
      };
    }
    // Check if the text is already in the target language
    else if (detectedSourceLanguage === targetLanguage) return null;
    // Prefer DeepL if the language is supported and no limit is reached
    else if (
      DeepL.supportedSourceLanguages.includes(detectedSourceLanguage) &&
      DeepL.supportedTargetLanguages.includes(deeplTargetLanguage) &&
      !(await DeepL.anyLimitReached())
    )
      result = {
        ...(await DeepL.translate(inputText, deeplTargetLanguage)),
        engine: DeepL,
      };
    // Otherwise use Microsoft's Translate API
    else
      result = {
        ...(await Microsoft.translate(inputText, targetLanguage)),
        engine: Microsoft,
      };

    // Check if the translation is the same as the input text
    if (!result.text || normalize(result.text) === normalize(inputText))
      return null;

    if (
      process.env.NODE_ENV !== 'production' &&
      detectedSourceLanguage !== result.detectedSourceLanguage
    )
      console.log(detectedSourceLanguage, result.detectedSourceLanguage);

    // Detected source language by the translation engine
    detectedSourceLanguage = result.detectedSourceLanguage;
    let sourceLanguageName = this.languageCodes[detectedSourceLanguage];
    let targetLanguageName = this.languageCodes[targetLanguage];
    result.embed = new EmbedBuilder()
      .setColor(0x5bccff)
      .setDescription(`>>> ${result.text}`)
      .setFooter({
        text: `${sourceLanguageName} → ${targetLanguageName}  •  ${result.engine.name}`,
        iconURL: result.engine.icon,
      });

    return result;
  }
}
