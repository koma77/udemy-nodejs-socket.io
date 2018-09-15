const path = require('path');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');

var app = express();
var server  = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {

  socket.emit('newMessage', {
    from: 'server@example.com',
    text: 'test email from server',
    createdAt: '1234567890'
  });

  socket.on('createMessage', (newEmail) => {
    console.log('Got new message', newEmail);
  });

  console.log('New client connection');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
