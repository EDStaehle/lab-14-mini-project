'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

const { acknowledgeTicket, helpingTicket, completedTicket } = require('./handler');

// currying helpingTicket function to pass socket
const helpingStudent = helpingTicket(socket);

socket.on('NEW_TICKET', (payload) => {
  acknowledgeTicket(payload);
});

socket.on('COMPLETED', (payload) => {
});

setTimeout(() => {
  // adding empty string bc I think we need something
  socket.emit('GET_TICKET', '');
}, 10000);
