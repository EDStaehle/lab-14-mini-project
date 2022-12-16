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
  socket.on('AVAILABILITY', (payload) =>{
    socket.emit('START_TICKET', payload);

   let nextTicket = ticketQueue.dequeue();
   socket.to(payload.helper).emit(nextTicket)
    // do an instructor queue
    // save availability
    // if the instructor is available can we emit next help ticket???
    //
  })
  socket.on('NEW_TICKET', (payload) => {
    console.log('we are in the new ticket listen')
    ticketQueue.enqueue(payload);
    console.log(ticketQueue.peek());

  });
  socket.on('INBOUND', (payload) => {
    socket.to(payload.queueId).emit('INBOUND', payload);
  });
  socket.on('HELPING', (payload) => {
    //  pause inbound messages

  });
  socket.on('COMPLETED', (payload) => {
      console.log('we are in the completed');
    // remove from queue
  });
  socket.on('READY_FOR_NEW', (payload) => {
    //  get next message from queue
  });
});
module.exports = ticketQueue;
