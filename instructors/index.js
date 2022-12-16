'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/help');
const { startNewTicket, helping } = require('./handler');
socket.emit('AVAILABILITY', {helper: 'elias'})

socket.on('START_TICKET', (payload) => startNewTicket(socket)(payload));

