const fetch = require('node-fetch');
const { Console } = require('winston/lib/winston/transports');

const key = 'X';
const base = 'https://api.hypixel.net';

async function getPlayer(username) {
    const method = `/player?key=${key}&name=${username}`;
    const json = await fetch(base + method).then(r => r.json());

    if (json.success === true) return json.player;

    return null;
}

async function getUUID(username){
    const player = await getPlayer(username);
    if (player === null) return null;
    const id = player.uuid;
    return id;
}

async function getStatus(username) {
    const player = await getPlayer(username);
    if (player === null) return null;
    const uuid = player.uuid;
    const method = `/status?key=${key}&uuid=${uuid}`;
    console.log(method);
    const json = await fetch(base + method).then(r => r.json());
    console.log(json);
    console.log(json.session)
    if (json.success === true) return json.session;


    return null;
}

async function getLocation(username){
    const status = await getStatus(username);

    if (status === null) return null;

    const on = status.online;

    if(!on){
        var notOnline = "offline";
        return notOnline;
    }
    else if(on === true){
        const game = status.gameType;
        const area = status.mode;
        return game;
    }
    
}



async function getLevel(username) {
    const base = 10000;
    const growth = 2500;
    const reversePqPrefix = -(base - 0.5 * growth) / growth;
    const reverseConst = reversePqPrefix ** 2;

    const player = await getPlayer(username);

    if (player === null) return null;

    const exp = player.networkExp;

    return exp < 0 ? 1 : Math.floor(1 + reversePqPrefix + Math.sqrt(reverseConst + (2 / growth) * exp));
}

module.exports = {
    getPlayer, getLevel, getUUID, getStatus, getLocation
}



fetch("https://api.hypixel.net/player?uuid=c6a7a165-55eb-4724-afbc-341db7bae4da&key=b3e3803a-e94e-4a05-8fd5-5618f7775a24")
.then(result => result.json())
.then(({ player }) => {
    // Log the player's username
    console.log(player.displayname);
    var username = player.displayname;
})
