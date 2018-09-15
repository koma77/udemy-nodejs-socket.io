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

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: ~~(new Date().getTime() / 1000)
    });
  });

  console.log('New client connection');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
