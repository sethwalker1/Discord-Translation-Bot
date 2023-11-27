import { v4 as uuidv4 } from 'uuid';
import Translate from './Translate.mjs';

export default class Microsoft {
  static supportedLanguages = [];
  static name = 'Microsoft Translator';
  static icon = 'https://translator.microsoft.com/favicon.png';
  static url = 'https://microsoft.com/en-us/translator/';

  static async request(endpoint, { method, body, queryParams }) {
    // Constructing the URL
    const url = new URL(`${process.env.TRANSLATOR_TEXT_ENDPOINT}/${endpoint}`);
    url.search = new URLSearchParams({
      'api-version': '3.0',
      ...queryParams,
    });

    let options = {
      method,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_TEXT_RESOURCE_KEY,
        'Ocp-Apim-Subscription-Region': process.env.TRANSLATOR_TEXT_REGION,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
    };

    if (body) options.body = JSON.stringify(body);

    // Sending the request
    const response = await fetch(url, options);

    // Processing the response
    const json = await response.json();

    // Returning the json data
    return json;
  }

  static async getSupportedLanguages() {
    // Sending the request
    const json = await this.request('languages', { method: 'GET' });

    // Storing the supported languages
    for (let i in json.translation) {
      this.supportedLanguages.push(i);
      Translate.languageCodes[i] = json.translation[i].name;
    }

    console.info(
      `Loaded ${this.supportedLanguages.length} languages from ${this.name}.`
    );
  }

  static async translate(inputText, targetLanguage) {
    // Sending the request
    const json = await this.request('translate', {
      method: 'POST',
      body: [
        {
          text: inputText,
        },
      ],
      queryParams: {
        to: targetLanguage,
      },
    });

    // Returning the translation
    return {
      text: json[0].translations[0].text,
      detectedSourceLanguage: json[0].detectedLanguage.language,
      engine: this,
    };
  }
}
