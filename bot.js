// const { Client, GatewayIntentBits } = require('discord.js');

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent, // Allows the bot to read message content
//   ],
// });

// const token =
//   'MTI4NzAzMDU1NjY5Mjk3MTU4MQ.G6EjeF.H5YHOGXHwBy0XvrhmMq0X35es6bdM5eSRYNFg0'; // Replace with your bot's token

// client.once('ready', () => {
//   console.log('Bot is online!');
// });

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// client.on('messageCreate', async message => {
//   if (message.content.startsWith('!count')) {
//     const parts = message.content.split(' ');
//     const startNumber = parseInt(parts[1]) || 2244;
//     const endNumber = 3;

//     for (let i = startNumber; i <= endNumber; i++) {
//       await message.channel.send(i.toString());
//       await sleep(1000);
//     }
//   }
// });

// client.login(token);


// * FUNCTIONS
const getRandomResponse = (responses) => {
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  message.channel.send(randomResponse);
}

// --------------- START -----------------

const { Client, GatewayIntentBits } = require('discord.js');
const keep_alive = require('./keep_alive.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log('Bot is online!');
});

const greetingCooldowns = new Map();
const bossCooldowns = new Map();
const greetingCooldownTime = 30000;
const bossCooldownTime = 600000;
/**
 * Responding to User Messages and Reacting
 */
client.on('messageCreate', message => {
  if (message.author.bot) return;

  // ------------------- HINDI HATE RESPONSE --------------------------
  const Hindi_Hate_Response = [
    'aur bhailog kya haal chaal',
    'sab Theek',
    'sab theek hai',
    'sab theek hai bhai',
    'are bhai',
    'aree bhai',
    'bhai',
    'bhaiyo',
    'bhaiyon',
    'nhi',
    'acha',
    'kya',
    'kaise',
    'kaise ho',
    'kaise ho bhai',
    'kaise ho bhaiyo',
    'chalo',
    'chalo bhai',
    'chalo bhaiyo',
    'yaar',
    'milega',
    'kehde',
    'mujhe',
    'mere',
    'khud ni',
    'thik',
    'jab',
    'pata',
  ];
  if (
    Hindi_Hate_Response.some(phrase =>
      message.content.toLowerCase().includes(phrase)
    )
  ) {
    const responses = [
      `Hey <@${message.author.id}>!, Can you please speak in English?`,
      `Sorry <@${message.author.id}>, I don't understand Hindi.`,
      `Speak English Please 🙏😁, <@${message.author.id}>.`,
      `I can only respond to English messages, <@${message.author.id}>.`,
      `Let's keep the conversation in English, <@${message.author.id}>.`,
      `I know only little bit of Hindi, <@${message.author.id}>. Please use English.`,
      `If you talk in Hindi then you are gay, <@${message.author.id}>.`,
      `Whoevers speaks in Hindi is gay, Including you <@${message.author.id}>.`,
      `Nood <@${message.author.id}>, I don't understand Hindi.`,
    ];
    getRandomResponse(responses);
  }

  // ------------------- GAY RESPONSE --------------------------
  if (message.content.toLowerCase().includes('gay')) {
    const responses = [
      `No, you are the gay one, <@${message.author.id}>.`,
      `Don’t worry, you are too ugly to kiss. <@${message.author.id}>.`,
      `Here is the gay community for you 🏳️‍🌈, <@${message.author.id}>.`,
      `Oh my God, how do you tell?? Usually only gays who can identify other gays. <@${message.author.id}> 🏳️‍🌈.`,
    ];
    getRandomResponse(responses);
  }

  // ------------------- TAGS LEAKED RESPONSE --------------------------
  if (
    message.content.toLowerCase().includes('tags') ||
    message.content.toLowerCase().includes('tag') ||
    message.content.toLowerCase().includes(message.content.startsWith('!') ? message.content.substring(1) : 'test') // todo : added one more condition that if someone leak the code tag on message, its detected and return the responses value
  ) {
    const responses = [
      `Whoever talks about tags here is gay! <@${message.author.id}>`,
      `Tags are not allowed here. <@${message.author.id}>`,
      `Don't talk about tags here. <@${message.author.id}>`,
      `Avoid Talking about tags, Read the #rules no. 6 <@${message.author.id}>`,
    ];
    getRandomResponse(responses)
  }

  // ------------------- BAD WORDS RESPONSE --------------------------
  const badwords = [
    'mf',
    'mother fucker',
    'motherchod',
    'bhenchod',
    'fuck',
    'fk',
  ];

  if (badwords.some(phrase => message.content.toLowerCase().includes(phrase))) {
    const responses = [
      `Whoever speaks bad words is gay! <@${message.author.id}>`,
      `Bad words are not allowed here. <@${message.author.id}>`,
      `No harmful words, please. <@${message.author.id}>`,
      `Avoid using bad words. <@${message.author.id}>`,
      `Control your words. <@${message.author.id}>`
      `wowowow chill chill, no need to use bad words. <@${message.author.id}>`
    ];
    getRandomResponse(responses)
  }

  // -----------------------GREETINGS RESPONSE-----------------------
  const greetings = [
    'hello',
    'hi',
    'hii',
    'hey',
    'hy',
    'hui',
    'huii',
    'yo',
    'yoo',
    'sup',
    "what's up",
  ];

  const userId = message.author.id; // Get the user's ID
  const currentTime = Date.now(); // Get the current time

  const mentionedBot = message.mentions.has(client.user);

  if (greetings.includes(message.content.toLowerCase()) || mentionedBot) {
    const lastGreetingTime = greetingCooldowns.get(userId);

    if (
      !lastGreetingTime ||
      currentTime - lastGreetingTime >= greetingCooldownTime
    ) {
      const responses = [
        `Hello! <@${message.author.id}>`,
        `Hi! <@${message.author.id}>`,
        `Hey! <@${message.author.id}>`,
        `Yo! <@${message.author.id}>`,
        `What's up! <@${message.author.id}>`,
        `Hey there! <@${message.author.id}>`,
        `What's up! <@${message.author.id}>`,
      ];
      getRandomResponse(responses)
      greetingCooldowns.set(userId, currentTime);
    }
  }

  // -----------------------DAY GREETINGS RESPONSE-----------------------
  const dayGreetings = [
    'good morning',
    'good afternoon',
    'good evening',
    'good night',
  ];

  const responses = {
    'good morning': `Good Morning! <@${message.author.id} 🌞>`,
    'good afternoon': `Good Afternoon! <@${message.author.id}>`,
    'good evening': `Good Evening! <@${message.author.id}>`,
    'good night': `Good Night! <@${message.author.id}> 🌙`,
  };

  const userMessage = message.content.toLowerCase();

  const greeting = dayGreetings.find(phrase => userMessage.includes(phrase));
  
  if (greeting) {
    message.channel.send(responses[greeting]);
  }

  // -----------------------HOW ARE YOU RESPONSE-----------------------
  const howAreYouResponses = [
    'how are you',
    'how r u',
    'how are u',
    'how are you doing',
    'how are you feeling',
    'how are you today',
    'how are you feeling today',
  ];
  if (
    howAreYouResponses.some(phrase =>
      message.content.toLowerCase().includes(phrase)
    )
  ) {
    message.channel.send(
      `I'm doing great!😀
      How about you, ${message.author.id}?, I hope you asked me else ignore.`
    );
  }

  // -----------------------BOSS RESPONSE-----------------------
  const boss = [
    'who is your boss',
    'who is your boss?',
    'who is ur boss',
    'who is ur boss?',
    `who's your boss`,
    `who's your boss?`,
    `who's ur boss`,
    `who's ur boss?`,
    `who is your owner`,
    `who is your owner?`,
    `who is ur owner`,
    `who is ur owner?`,
    `who's your owner`,
    `who's your owner?`,
    `who created you`,
    'who created you?',
  ];
  if (boss.some(phrase => message.content.toLowerCase() === phrase)) {
    const ownerID = '888712652409409546';
    const responses = [
      `My boss is <@${ownerID}> 😎!`,
      `I belong to <@${ownerID}>!`,
      `I was created by <@${ownerID}> 😊!`,
      `I was made by <@${ownerID}> 😁!`,
    ];
    getRandomResponse(responses);
  }

  // -----------------------BOSS CALL-----------------------
  const ownerID = '888712652409409546';
  if (
    message.content.toLowerCase().includes(`<@${ownerID}>`) ||
    message.content.toLowerCase().includes(`<@!${ownerID}>`) ||
    message.content.toLowerCase().includes(`adil`) ||
    message.content.toLowerCase().includes(`rock adil`) ||
    message.content.toLowerCase().includes(`adil ahamed`)
  ) {
    const lastBossResponseTime = bossCooldowns.get(userId);

    if (
      !lastBossResponseTime ||
      currentTime - lastBossResponseTime >= bossCooldownTime
    ) {
      message.channel.send(
        `<@${ownerID}> Seems someone is calling you! or talking about you.`
      );

      bossCooldowns.set(userId, currentTime);
    }
  }

  // -----------------------BYE RESPONSE-----------------------
  const bye = ['bye', 'goodbye', 'good bye', 'see you', 'see you later'];
  if (bye.some(phrase => message.content.toLowerCase().includes(phrase))) {
    message.channel.send(`Bye, ${message.author.username}!`);
  }

  // -----------------------GOOD and BAD RESPONSE-----------------------
  const goods = [
    'ok',
    'okay',
    'kk',
    'alright',
    'thank you',
    'thanks',
    'thx',
    'tx',
    'ty',
    'tysm',
    'thank you so much',
    'good',
    'well',
    'great',
    'awesome',
    'amazing',
    'fantastic',
    'nice',
    'cool',
    'sweet',
    'superb',
    'excellent',
    'wonderful',
  ];
  const bads = [
    'not good',
    'not well',
    'bad',
    'not good',
    'not well',
    'not great',
    'not awesome',
    'not amazing',
    'not fantastic',
    'not nice',
    'not cool',
    'not sweet',
    'not superb',
    'not excellent',
    'not wonderful',
    'nood',
    'noob',
    'noobie',
    'noobies',
    'noobz',
    'noobs',
  ];
  const content = message.content.toLowerCase().trim();

  if (goods.includes(message.content.toLowerCase())) {
    message.react('👍');
  }

  if (content === 'good bot') {
    message.react('🥰');
  } else if (content === 'bad bot') {
    message.react('🥹');
  }

  if (bads.includes(message.content.toLowerCase())) {
    message.react('👎');
  }
});

/**
 * Welcoming New Members
 */
client.on('guildMemberAdd', member => {
  const channelID = '1283798249190457397'; // Replace with your 'general-chat' channel ID
  const channel = member.guild.channels.cache.get(channelID);

  if (channel) {
    channel.send(
      `Welcome to the server, <@${member.id}>! We're glad to have you here!`
    );
  }
});

client.login(process.env.BOT_TOKEN);
