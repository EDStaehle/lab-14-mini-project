'use strict';

const acknowledgeTicket = (payload) => {
  console.log('Instructor has seen ticket:', payload.ticketId);
};

const helpingTicket = (payload) => {
  console.log('Instructor helping with ticket:', payload.ticketId);
};

const completedTicket = (payload) => {
  console.log('Instructor has completed ticket: ', payload.ticketId);
};

module.exports = { acknowledgeTicket, helpingTicket, completedTicket };

