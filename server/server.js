const path = require('path');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage } = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const express = require('express');

var app = express();
var server  = http.createServer(app);
var io = socketIO(server);
var users = new Users;

app.use(express.static(publicPath));
io.on('connection', (socket) => {

  // // A message from admin to user
  // socket.emit('newMessage',
  //   generateMessage('Admin' ,'welcome to the chat app'));
  //
  // // A message to all connected except the user
  // socket.broadcast.emit('newMessage',
  //   generateMessage('Admin', 'a new user joined'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //console.log(users.users);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // A message from admin to user
    socket.emit('newMessage',
      generateMessage('Admin' ,'welcome to the chat app'));

    // A message to all connected except the user
    socket.broadcast.to(params.room).emit('newMessage',
      generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createLocationMessage', function(coords) {
    var user = users.getUser(socket.id);
    if (user && coords ) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });


  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
    //console.log('got message: ', message)
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    //callback('ack from server');
    }
    callback();
  });


  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
    user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left.`));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
