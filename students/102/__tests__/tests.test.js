// 'use strict';

// const { generateOrder, thankDriver } = require('./handlers');
// let socket = require('../socket-client');

// jest.mock('../socket-client', () => {
//   return {
//     on: jest.fn(),
//     emit: jest.fn(),
//   };
// });
// console.log = jest.fn();

// describe('Students', () => {
//   test('emits an help ticket', () => {
//     const payload = {
//         'studentName' : 'chris',
//         'ticketId' : 12345678987654321,
//         'class' : 'CODE-102',
//         description: 'help me',
//         instructor: 'ryan',
//     };
//     generateOrder(socket)(payload);
//     expect(console.log).toHaveBeenCalledWith('chris from CODE-102: Created help ticket');
//     expect(socket.emit).toHaveBeenCalledWith('NEW_TICKET', payload);
//   });

//   test('thanks the driver', () => {
//     thankDriver({customer: 'Nemo'});
//     expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering to:', 'Nemo');
//   });
// });
