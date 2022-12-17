'use strict';

const Chance = require('chance');
const chance = new Chance();

const generateTicket = (socket) => (payload = null) => {
  payload = payload ? payload : {
    studentName : chance.name(),
    ticketId : chance.guid(),
    class: 'CODE-102',
    description: chance.sentence({words:5}),
  };

  console.log('Student from CODE-102: Created help ticket');
  socket.emit('NEW_TICKET', payload);
};

const thankInstructor = (payload) => {
  console.log('Student from CODE-102: Thank you for helping:', payload.studentName);
};

module.exports = { generateTicket, thankInstructor };
