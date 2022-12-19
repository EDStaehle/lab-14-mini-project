'use strict';

const Chance = require('chance');
const chance = new Chance();

const generateTicket = (socket) => (payload = null) => {
  payload = payload ? payload : {
    studentName : chance.name(),
    ticketId : chance.guid(),
    class: 'CODE-102',
    description: chance.sentence({words:5}),
    instructor: null,
  };

  console.log(`${payload.studentName} from CODE-102: Created help ticket`);
  socket.emit('NEW_TICKET', payload);
};

const receivingHelp = (payload) => {
  console.log(payload.studentName, 'is receiving help with ticket:', payload.ticketId);
};

const thankInstructor = (payload) => {
  console.log(`${payload.instructor} thank you for helping ${payload.studentName}`);
};

module.exports = { generateTicket, receivingHelp, thankInstructor };
