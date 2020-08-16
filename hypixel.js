const fetch = require('node-fetch');

const key = 'b3e3803a-e94e-4a05-8fd5-5618f7775a24';
const base = 'https://api.hypixel.net';

async function getPlayer(username) {
    const method = `/player?key=${key}&name=${username}`;
    const json = await fetch(base + method).then(r => r.json());

    if (json.success === true) return json.player;

    return null;
}

async function getUUID(username2){
    const userName = await getPlayer(username);
    
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
    getPlayer, getLevel,
};




fetch("https://api.hypixel.net/player?uuid=c6a7a165-55eb-4724-afbc-341db7bae4da&key=b3e3803a-e94e-4a05-8fd5-5618f7775a24")
.then(result => result.json())
.then(({ player }) => {
    // Log the player's username
    console.log(player.displayname);
    var username = player.displayname;
})
