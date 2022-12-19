'use strict';

const { acknowledgeTicket, getTicket, helpingTicket, completedTicket } = require('../handler');
let socket = require('../socket-client');

jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Instructor', () => {
  test('gets a help ticket', () => {
    const payload = {
        'studentName' : 'chris',
        'ticketId' : 12345678987654321,
        'class' : 'CODE-102',
        description: 'help me',
        instructor: 'ryan',
    };
    acknowledgeTicket(payload);
    expect(console.log).toHaveBeenCalledWith('Instructor has seen ticket: 12345678987654321');
    expect(socket.emit).toHaveBeenCalledWith('NEW_TICKET', payload);
  });
  test('helps', () => {
    const payload = {
      'studentName' : 'chris',
      'ticketId' : 12345678987654321,
      'class' : 'CODE-102',
      description: 'help me',
      instructor: 'ryan',
  };
  helpingTicket(payload);
  expect(console.log).toHaveBeenCalledWith(`ryan has completed chris's ticket: 12345678987654321`);
  expect(socket.emit).toHaveBeenCalledWith('HELPING', payload);
  });
  const payload = {
    'studentName' : 'chris',
    'ticketId' : 12345678987654321,
    'class' : 'CODE-102',
    description: 'help me',
    instructor: 'ryan',
};
completedTicket(payload);
expect(socket.emit).toHaveBeenCalledWith('COMPLETED', payload);

});
