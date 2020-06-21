const express = require('express');
const path = require('path');

const server = express();

server.get('/', (resquest, response) => {
    response.sendFile(__dirname + '/static/index.html')
});

server.get('/star', (resquest, response) => {
    response.sendFile(__dirname + '/static/game.html')
});

server.use('/game', express.static(__dirname + '/script'));
server.use('/phaser', express.static(__dirname + '/phaser'));
server.use('/world', express.static(__dirname + '/assets'));
server.use('/bootstrap/css', express.static(__dirname + '/bootstrap/css'));
server.use('/bootstrap/js', express.static(__dirname + '/bootstrap/js'));
server.use('/css', express.static(__dirname + '/css'));

server.listen(2000, () => {
    console.log('\n\n\n\================= | Stonks | =================\n\n\n');
});