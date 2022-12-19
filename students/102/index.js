'use strict';

const { generateTicket, receivingHelp, thankInstructor } = require('./handlers');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

socket.emit('JOIN', 'CODE-102');

socket.on('HELPING_STUDENT', (payload) => receivingHelp(payload));

socket.on('STUDENT_COMPLETED', (payload) => thankInstructor(payload));


setInterval(() => {
  generateTicket(socket)();
}, 5000);
