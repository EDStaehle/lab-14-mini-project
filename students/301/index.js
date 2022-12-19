'use strict';

const { generateTicket, receivingHelp, thankInstructor } = require('./handlers');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

socket.emit('JOIN', 'CODE-301');

socket.on('HELPING',(payload) => receivingHelp(payload));

socket.on('COMPLETED', (payload) => thankInstructor(payload));

setInterval(() => {
  generateTicket(socket)();
}, 9000);
