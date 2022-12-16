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
    socket.broadcast.emit('NEW_TICKET', payload);
  });
  socket.on('INBOUND', (payload) => {
    socket.to(payload.queueId).emit('INBOUND', payload);
  });
  socket.on('HELPING', (payload) => {
    //  pause inbound messages
    let currentQueue = ticketQueue.read(payload.queueId);
    if(!currentQueue){
      let queueKey = ticketQueue.store(payload.queueId, new Queue());
      currentQueue = ticketQueue.read(queueKey);
    }
    currentQueue.store(payload.ticketId, payload);
    console.log('------------------',currentQueue);
    if(currentQueue.data[payload.ticketId].helping === true) {
        console.log('we are inside helping event conditional',currentQueue.data[payload.ticketId].helping);
        currentQueue.store(payload.ticketId, payload);
        console.log('new ticket but no available TA');

      console.log('A student has requested help with a new ticket.', payload);
    }
  });
  socket.on('COMPLETED', (payload) => {
    let currentQueue = ticketQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('we have tickets but no queue')
    }
    console.log('we are in the completed listen-----------');
    console.log(payload.ticketId);
    let notification = currentQueue.remove(payload.ticketId);
    socket.to(payload.queueId).emit('COMPLETED', notification);
    // remove from queue
  });
  socket.on('READY', (payload) => {
    //  get next message from queue
  });
});
module.exports = ticketQueue;
