'use strict';

const { generateTicket, thankInstructor } = require('./handlers');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

socket.emit('JOIN', 'CODE-102');

socket.on('COMPLETED',(payload) => thankInstructor(payload));

setInterval(() => {
  generateTicket(socket)();
}, 2000);
