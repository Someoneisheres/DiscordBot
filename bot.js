const Discord = require('discord.js');
const hypixel = require('./hypixel');


const client = new Discord.Client();
const prefix = "!";

client.on('ready', function () {
    console.log(`Logged in as ${client.user.username}`);
});


client.on('message', async function (message) {
    const content = message.content;

    if (content.startsWith(prefix)) {
        const pieces = content.split(" ");
        const command = pieces.shift();

        if (command === prefix + 'level') {
            const username = pieces.shift(); 

            if (!username) {
                message.channel.send('Specify a player name!');
                return;
            }

            const level = await hypixel.getLevel(username);
            

            if (level === null) {
                message.channel.send('Player not found!');
                return;
            }

            message.channel.send(`Level of user: ${level}`);
        }
        else if(command === prefix + 'botinfo'){
            message.channel.send("Created by SpyGood on August 15, 2020 to test discord and hypixel bot API.")
        }
    }
});




client.login('NzQ0MzAxMDg1MTYxODE2MTc2.XzhOZw.zn0ONHXMIXNH9BEnEdtZJBn05IE');

