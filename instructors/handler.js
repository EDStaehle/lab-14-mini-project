'use strict';

const ticketQueue = require('../server/index');

const acknowledgeTicket = (payload) => {
  console.log('Instructor has seen ticket:', payload.ticketId);
};

const helpingTicket = (socket) => (payload) => {
  console.log('Instructor helping with ticket:', payload.ticketId);
  // socket.emit('HELPING', (payload));
};

const completedTicket = (payload) => {
  console.log('Instructor has completed ticket: ', payload.ticketId);
};

module.exports = { acknowledgeTicket, helpingTicket, completedTicket };

