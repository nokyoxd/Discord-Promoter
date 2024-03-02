const discord = require('discord.js-selfbot-v13');
const utils = require('./utils.js');

const token = "NTAyMjk5MzI4NTU2MTcxMjY0.GWIcuw.IDFbm2XpeZLQXFVSAIoQA5ZfZf509YXzPZFWNY";
const client = new discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

const postMessage = async (data) => {
    const ids = await utils.parseID();

    for (let i = 0; i < ids.length; i++) {

        let id = ids[i];
        let channel = client.channels.cache.get(id);
        if (!channel) {
            console.error(`Invalid channel: ${id}`);
            continue;
        }

        channel.send(data).catch(console.error);

        console.log(`Processed ID: ${ids[i]}`);
    }
}

client.on('messageCreate', async interaction => {

    const channel_id = interaction.channel.id;
    if (channel_id !== "1212084116963467326")
        return;

    const message = interaction.content;
    const { cmd, data } = utils.parseCommand(message);
    
    if (!data) {
        console.error('No data been provided!');
        return;
    }

    switch (cmd)
    {
        case 'save':
            utils.saveID(data);
            break;
        
        case 'post':
            postMessage(data);
            break;
        default:
            return;
    }

    
});

client.login(token);
