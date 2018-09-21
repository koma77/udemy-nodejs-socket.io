const path = require('path');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage } = require('./utils/message');

const express = require('express');

var app = express();
var server  = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {

  // A message from admin to user
  socket.emit('newMessage',
    generateMessage('Admin' ,'welcome to the chat app'));

  // A message to all connected except the user
  socket.broadcast.emit('newMessage',
    generateMessage('admin', 'a new user joined'));

  socket.on('createLocationMessage', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });


  socket.on('createMessage', (message, callback) => {
    console.log('got message: ', message)
    io.emit('newMessage',
      generateMessage(message.from, message.text));
    //callback('ack from server');
    callback();
  });


  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
