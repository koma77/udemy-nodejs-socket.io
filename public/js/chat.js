var socket = io();

function scrollToBottom () {
  //Selectors
  var messages = jQuery('#messages');
  //var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  //var newMessageHeight = newMessage.innerHeight();
  //var lastMessageHeight = newMessage.prev().innerHeight();

  //if (clientHeight + scrollTop > scrollHeight ) {
  if (clientHeight + scrollTop < scrollHeight) {
    messages.scrollTop(scrollHeight);
    //console.log('Should scroll');
  }
}

socket.on('join', function(params, callback) {

});

socket.on('connect', function() {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);

  jQuery('#people_list_h3').text(`People at ${params.room}`);


  socket.emit('join', params, function(err) {
      if (err) {
        alert(err);
        window.location.href='/';
      } else {
        console.log('No error');
      }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  //console.log('userList updated', users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  //console.log('Got a new message', data);
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
  // var formattedTime = moment(message.createdAt).format('H:mm');
  // var li = jQuery('<li></li>');
  // li.text(`${formattedTime} ${message.from}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('H:mm');

  var template = jQuery('#message-location-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    url: message.url
  });

  //var li = jQuery('<li></li>');
  //var a = jQuery('<a target="_blank">My current location</a>');
  //  var formattedTime = moment(message.createdAt).format('H:mm');
  // li.text(`${formattedTime} ${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);

  jQuery('#messages').append(html);
  scrollToBottom();
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
