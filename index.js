var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("im up");  //server onlinme :sun galles:

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new player: '+socket.id);

  socket.on('newPos', playerPos);
  socket.on('itemChange', itemChange);

  function playerPos(data){
    socket.broadcast.emit('newPos', data);
  }

  function itemChange(data){
    socket.broadcast.emit('itemChange', data);
    console.log(data);
  }
}
