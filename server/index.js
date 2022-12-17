'use strict';

// defining Socket.io server
require('dotenv').config();
const {Server} = require('socket.io');
const PORT = process.env.PORT;
const server = new Server(PORT);
const help = server.of('/help');

console.log(`Connected to server at ${PORT}`);

// setting up ticket queue
const Queue = require('./lib/queue');
const ticketQueue = new Queue();

let busy = false;

help.on('connection', (socket) => {
  console.log('The socket connected to help on namespace: ', socket.id);
  socket.on('JOIN', (queueId) => {
    socket.join('joined the room: ', queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('NEW_TICKET', (payload) => {
    ticketQueue.enqueue(payload);
    console.log('Student has added a new ticket.');
    // if instructor isn't busy
    // dequeue the ticket? or just take the payload immediately?
    // emit helping
  });

  socket.on('GET_TICKET', (payload) => {
    if (!ticketQueue.isEmpty()) {
      let nextTicket = ticketQueue.dequeue();
      busy = true;
      console.log('busy inside GET_TICKET', busy);
      socket.emit('HELPING', nextTicket);
    } else {
      console.log('Ticket queue is empty.');
    }
  });

  socket.on('HELPING', (payload) => {
    console.log(`${payload.studentName} is being helped with ${payload.ticketId}.`);
  });

  socket.on('COMPLETED', (payload) => {
    busy = false;
    console.log(`Ticket ${payload.ticketId} for ${payload.studentName} is now complete.`);
  });

});
