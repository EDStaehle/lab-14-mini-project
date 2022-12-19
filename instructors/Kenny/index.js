'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

const { acknowledgeTicket, helpingTicket, completedTicket } = require('./handler');

socket.on('NEW_TICKET', (payload) => {
  acknowledgeTicket(payload);
});

socket.on('HELPING', (payload) => {
  helpingTicket(payload);
  setTimeout(() => {
    socket.emit('COMPLETED', payload);
  }, 7000);
});

socket.on('COMPLETED', (payload) => {
  completedTicket(payload);
});

setInterval(() => {
  socket.emit('GET_TICKET', {instructor : 'Kenny Lino'});
  console.log('Getting ticket');
}, 8000);
