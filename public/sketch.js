var canwidth = 600;
var canheight = 600;

var player = new player();

var socket;

var people = [];

function setup() {
  createCanvas(canwidth, canheight);

  socket = io.connect('http://localhost:3000');
  socket.on('newPos', newOtherPlayer);
}
function newOtherPlayer(data){
  var neww = true;
  for (var i = 0; i < people.length; i++) {
    if (people[i].id == data.id){
      people[i].x = data.x;
      people[i].y = data.y;
      neww = false;
    }
  }

  if (neww == true){
    people[people.length] = new other(data);
  }
}


var framecount = 0;
function draw() {
  background(52);
  framecount++;

  player.show();

  for (var i = 0; i < people.length; i++) {
    people[i].show();
  }

  if (keyIsDown(65)) {
    player.x = player.x - player.speed;
    sendData();
  }
  if (keyIsDown(68)) {
    player.x = player.x + player.speed;
    sendData();
  }
  if (keyIsDown(83)) {
    player.y = player.y + player.speed;
    sendData();
  }
  if (keyIsDown(87)) {
    player.y = player.y - player.speed;
    sendData();
  }
}


function sendData(){

  var data = {
    x: player.x,
    y: player.y,
    id: player.id
  }

  socket.emit('newPos', data);
}
