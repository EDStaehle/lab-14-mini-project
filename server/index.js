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

help.on('connection', (socket) => {
  console.log('The socket connected to help on namespace: ', socket.id);
  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    console.log('joined the room: ', queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('NEW_TICKET', (payload) => {
    ticketQueue.enqueue(payload);
    console.log(payload.studentName, 'has added a new ticket.');
    console.log('Current number of students in line:', ticketQueue.length);
  });

  socket.on('GET_TICKET', (payload) => {
    if (!ticketQueue.isEmpty()) {
      console.log(payload.instructor, 'accepted new ticket. New number of students in line:', ticketQueue.length);
      let newTicket = ticketQueue.dequeue();
      newTicket['instructor'] = payload.instructor;
      payload = newTicket;
      socket.emit('HELPING', payload);
      socket.to(payload.class).emit('HELPING_STUDENT', payload);
    } else {
      console.log('Ticket queue is empty.');
    }
  });

  socket.on('COMPLETED', (payload) => {
    console.log(`${payload.instructor} completed ${payload.studentName}'s help ticket: ${payload.ticketId}.`);
    socket.emit('COMPLETED', payload);
    socket.to(payload.class).emit('STUDENT_COMPLETED', payload);
  });

});
