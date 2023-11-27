import * as deepl from 'deepl-node';
import Translate from './Translate.mjs';

export default class DeepL {
  static supportedSourceLanguages = [];
  static supportedTargetLanguages = [];
  static name = 'DeepL Translator';
  static icon = 'https://static.deepl.com/img/favicon/favicon_16.png';
  static url = 'https://deepl.com/translator';

  static async anyLimitReached() {
    const translator = new deepl.Translator(process.env.DEEPL_TOKEN);
    const usage = await translator.getUsage().catch(() => ({}));
    return usage ? usage.anyLimitReached() : true;
  }

  static async getSupportedLanguages() {
    const translator = new deepl.Translator(process.env.DEEPL_TOKEN);
    const sourceLanguages = await translator.getSourceLanguages();

    this.supportedSourceLanguages = [];
    for (let lang of sourceLanguages) {
      this.supportedSourceLanguages.push(lang.code);
      Translate.languageCodes[lang.code] = lang.name;
    }

    const targetLanguages = await translator.getTargetLanguages();
    this.supportedTargetLanguages = [];
    for (let lang of targetLanguages) {
      this.supportedTargetLanguages.push(lang.code);
      Translate.languageCodes[lang.code] = lang.name;
    }

    console.info(
      `Loaded ${
        new Set([
          ...this.supportedSourceLanguages,
          ...this.supportedTargetLanguages,
        ]).size
      } languages from ${this.name}.`
    );
  }

  static async translate(inputText, targetLanguage) {
    // Build the translator object
    const translator = new deepl.Translator(process.env.DEEPL_TOKEN);

    // Translate and remap the detectedSourceLang property to detectedSourceLanguage
    const { text, detectedSourceLang: detectedSourceLanguage } =
      await translator.translateText(inputText, null, targetLanguage);

    // Return the result
    return { text, detectedSourceLanguage, engine: this };
  }
}
