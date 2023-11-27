export default class Pirate {
  static name = `The Pirate Translator`;
  static icon = `https://flaticons.net/custom.php?i=zvmFDVuW6Nn8SqIPI6Iw7CnJAXRIk&format=png&size=64`;
  static url = `https://pirate.monkeyness.com/translate`;
  static async insult() {
    // Build the URL
    const url = new URL(`${process.env.PIRATE_API_URL}/insult`);

    // Send the request
    const response = await fetch(url);
    return await response.text();
  }

  static async translate(inputText) {
    // Build the URL
    const url = new URL(`${process.env.PIRATE_API_URL}/translate`);
    url.searchParams.append("english", inputText);

    // Send the request
    const response = await fetch(url);
    return await response.text();
  }
}