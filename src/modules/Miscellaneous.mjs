/**
 * Replaces various forms of commonly mismatched characters with their standard forms.
 * @param {string} text - The text to be normalized.
 * @return {string} - The text with replaced characters.
 */
export function normalize(text) {
  // Normalize the text
  text = text.normalize('NFKC');

  // Define commonly mismatched characters
  const replacements = {
    // Apostrophes and quotes
    '’': "'",
    '‘': "'",
    '“': '"',
    '”': '"',
    // Dashes and hyphens
    '–': '-',
    '—': '-',
    '‑': '-',
    // Add more replacements as needed
  };

  // Building a dynamic regex pattern from the keys of the replacements object
  const pattern = new RegExp(`[${Object.keys(replacements).join('')}]`, 'g');

  // Replace the mismatched characters
  return text.replace(pattern, match => replacements[match]);
}
