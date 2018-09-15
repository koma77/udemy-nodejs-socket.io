var socket = io();

var createMessage = function() {
  socket.emit('createMessage', {
    from: 'client1@example.com',
    text: 'a test message'
  });
}

socket.on('connect', function() {
  console.log('Connected to server');
  createMessage();
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('Got a new message', data);
});
