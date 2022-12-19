'use strict';

const acknowledgeTicket = (payload) => {
  console.log('Instructor has seen ticket:', payload.ticketId);
};

const getTicket = (socket) => (payload) => {
  socket.emit('GET_TICKET', {instructor: 'Elias'});
};

const helpingTicket = (payload) => {
  console.log(`${payload.instructor} helping ${payload.studentName} with ticket: ${payload.ticketId}`);
};

const completedTicket = (payload) => {
  console.log(`${payload.instructor} has completed ${payload.studentName}'s ticket: ${payload.ticketId}`);
};

module.exports = { acknowledgeTicket, getTicket, helpingTicket, completedTicket };

