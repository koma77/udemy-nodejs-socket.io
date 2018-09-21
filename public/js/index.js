var socket = io();

var createMessage = function() {
  socket.emit('createMessage', {
    from: 'client1@example.com',
    text: 'a test message'
  });
}

/*
socket.on('connect', function() {
  console.log('Connected to server');
  createMessage();
});
*/

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('Got a new message', data);
  li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`);

  jQuery('#messages').append(li);
});

/*
socket.emit('createMessage', {
  from: 'Fred',
  text: 'Hi'
}, function(msg) {
  console.log('got it: ', msg);
});
*/

jQuery('#message-form').on('submit', function (ev) {
  ev.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
