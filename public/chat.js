//Make socket connection
var socketFE = io.connect();

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click', function(){
  socketFE.emit('chat', {
    message: message.value,
    handle: handle.value
  })
  //Clear message input after sending
  message.value = '';
});

document.addEventListener('keypress', function(e){
  if(e.key === 'Enter')
  {
    socketFE.emit('chat', {
      message: message.value,
      handle: handle.value
    })
    //Clear message input after sending
    message.value = '';
  }
});

message.addEventListener('keypress', function(){
  socketFE.emit('typing', handle.value);
});

//Listen for events
socketFE.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socketFE.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});
