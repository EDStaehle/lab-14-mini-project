'use strict';

require('dotenv').config();
const {Server} = require('socket.io');
const PORT = process.env.PORT;
console.log(PORT);
const Queue = require('./lib/queue');
const ticketQueue = new Queue();

const server = new Server(PORT);
const help = server.of('/help');


help.on('connection', (socket) => {
  console.log('The socket connected to help on namespace: ', socket.id);
  socket.on('JOIN', (queueId) => {
      socket.join('joined the room: ', queueId);
      socket.emit('JOIN', queueId);
  });
  console.log('socket connected to event server', socket.id);

  socket.on('NEW_TICKET', (payload) => {
    let currrentQueue = ticketQueue.read(payload.queueId);
    if(ticketQueue.helping){
      currrentQueue.store(payload.ticketId, payload)
      console.log('new ticket but no available TA');
    }
      console.log('A student has requested help with a new ticket.', payload);
      if(!currrentQueue){
        let queueKey = ticketQueue.store(payload.queueId, new Queue());
        currrentQueue = ticketQueue.read(queueKey);
      }
      currrentQueue.store(payload.ticketId, payload);
      socket.broadcast.emit('NEW_TICKET', payload);
  });
  socket.on('INBOUND', (payload) => {
      socket.to(payload.queueId).emit('INBOUND', payload)
  });
  socket.on('HELPING', (payload) => {
//  pause inbound messages
  });
  socket.on('COMPLETED', (payload) => {

    // remove from queue
  });
  socket.on('READY', (payload) => {
      //  get next message from queue
  });
})
module.exports = ticketQueue;
