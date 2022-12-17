'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');

const { acknowledgeTicket, helpingTicket, completedTicket } = require('./handler');

// currying helpingTicket function to pass socket
// const helpingStudent = helpingTicket(socket);

socket.on('NEW_TICKET', (payload) => {
  acknowledgeTicket(payload);
});

socket.on('HELPING', (payload) => {
  helpingTicket(payload);
  setTimeout(() => {
    socket.emit('COMPLETED', payload);
  }, 10000);
});

socket.on('COMPLETED', (payload) => {
  console.log('Instructor completed ticket', payload.ticketId);
});

setInterval(() => {
  // adding empty string bc I think we need something
  socket.emit('GET_TICKET', '');
  console.log('Getting ticket');
}, 10000);
