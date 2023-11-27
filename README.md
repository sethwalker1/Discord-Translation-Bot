# Translation Discord Bot: Your Go-To Multilingual Assistant

This is an (unofficial) fork of
[Discord Bot Framework](https://github.com/sethwalker1/Discord-Bot-Framework),
also developed by me.

**Tired of subpar translation bots on Discord? Look no further!**

Translation bots are a dime a dozen, but finding a good one? That's where
thechallenge lies. Most have high subscription costs associated with due to
implementing advanced Deep Learning models. One solution is to host it yourself,
using your own API token(s) for a free and accessible translation solution.

I made this in about two days because some of my friends couldn't find a single
free translation bot worth using. This bot aims to be just that. It's fast,
reliable, and easy to use.

## Getting Started

1. Install dependencies
   ```bash
   yarn install
   ```
2. Rename the `.env.example` file in the root directory to `.env` and add your
   values. Every variable is required except for `SENTRY_DSN`, which is only
   required if you want to use Sentry for error reporting.
   - You can also create a `.env.production` file to differentiate between
     development and production environments. With this setup, `.env` will
     override any production values while in development.
3. Start the bot
   - In production:
     ```bash
     yarn start
     ```
   - In development:
     ```bash
     yarn dev
     ```
4. Invite the bot to your server. You can generate an invite link from the
   [Discord Developer Portal](https://discord.com/developers/applications).

## Features

### Automatic Translation

The bot will automatically translate any message not matching the configured
language in the `.env` file.

### Manual Translation

React with a country's flag emoji to translate a message manually. Flag codes
and languages are in `src/modules/Emoji/`.

### Customization

Configure up to three translation APIs in the `.env` file, supporting over 130
languages and allowing for 2.5 million characters monthly.

#### Detect Language

[This API](https://detectlanguage.com/) is optional but recommended. It
identifies message languages, saving translation characters when the source
language matches the default. Offers 1000 free daily **requests**, with no
character limit!

#### DeepL

[DeepL](https://www.deepl.com/) provides high-quality translations using Deep
Learning. Free for up to 500,000 characters monthly across 29 languages.

#### Microsoft Translator

[Microsoft Translator](https://microsoft.com/en-us/translator/) offers 2 million
free characters monthly for personal use, supporting 120+ languages. Requires
more setup effort but maximizes your free character allowance.
