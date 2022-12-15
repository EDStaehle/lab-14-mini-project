const {io} = require("socket.io-client");
const socket = io('http://localhost:3001')
const ticketQueue = require('../server/index')
Socket.emit('HELPING',(payload) => helping(payload))



function helping(payload){
  console.log(`currently helping ${payload.ticketId}`);
  ticketQueue.helping = true
}
