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

socket.on('newMessage', function(message) {
  //console.log('Got a new message', data);
  var formattedTime = moment(message.createdAt).format('H:mm');
  var li = jQuery('<li></li>');
  li.text(`${formattedTime} ${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  var formattedTime = moment(message.createdAt).format('H:mm');

  li.text(`${formattedTime} ${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

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

  var messageTextBox = jQuery('[name=message]');
  ev.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    // Clear the value in sumit callback
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (! navigator.geolocation) {
    return alert('Geolocation is not supported.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled', 'disabled').text('Send location');
    socket.emit('createLocationMessage',  {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    //console.log(position);
  }, function () {
    locationButton.removeAttr('disabled', 'disabled').text('Send location');
    alert('Unable to get location.');
  } );
});
