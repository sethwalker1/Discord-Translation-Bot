import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  // All event handlers have to be asynchronous, so the .catch() method can be used
  async execute(client) {
    console.info(`Logged into Discord as ${client.user.tag}!`);
  },
};
