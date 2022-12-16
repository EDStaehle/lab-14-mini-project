'use strict';

const ticketQueue = require('../server/index');

const startNewTicket = (socket) => (payload) => {
  console.log('Instructor: seen the ticket:', payload.ticketId);
  socket.emit('INBOUND', payload);
  setTimeout(() => {
    console.log('Instructor: now helping with ticket:', payload.ticketId);
    console.log('ticketQueue>>>', ticketQueue.helping);
    socket.emit('HELPING', helping(payload));
  }, 2000);
  setTimeout(() => {
    socket.emit('COMPLETED', completed(payload));
  }, 6000);
};


const helping = (payload) => {
  console.log(`currently helping ${payload.ticketId}`);
  ticketQueue.helping = true;
};

const completed = (payload) => {
  console.log('BA-NA-NA');
  ticketQueue.helping = false;
};

module.exports = { startNewTicket, helping };

