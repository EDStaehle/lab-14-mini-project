'use strict';

const ticketQueue = require('../server/index');

const startNewTicket = (socket) => (payload) => {
  console.log('Instructor: seen the ticket:', payload.ticketId);
  socket.emit('INBOUND', payload);
  setTimeout(() => {
    console.log('Instructor: now helping with ticket:', payload.ticketId);
    console.log('ticketQueue>>>', ticketQueue.helping);
   console.log('starNewTicket', payload)
    socket.emit('HELPING', {...payload, helping: true});
  }, 2000);
  setTimeout(() => {
    socket.emit('COMPLETED', {...payload, helping: false});
  }, 15000);
};


const helping = (payload) => {
  console.log(`currently helping ${payload.ticketId}`);
  ticketQueue.helping = true;
};

const completed = (payload) => {
  console.log('inscrutctor has completed: ', payload.ticketId);
  ticketQueue.helping = false;
};

module.exports = { startNewTicket, helping };

