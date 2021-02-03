var canwidth = 600;
var canheight = 600;

var player = new player();

var socket;

var people = [];

var redSprite;
var blueSprite;
var whiteSprite;
var blackSprite;

function preload() {
  redSprite = loadImage('sprites/players/red.png');
  blueSprite = loadImage('sprites/players/blue.png');
  whiteSprite = loadImage('sprites/players/white.png');
  blackSprite = loadImage('sprites/players/black.png');


  //item stuff
  hilight = loadImage('sprites/items/hilight.gif');

  //ui stuff
  ui_new = loadImage('sprites/ui/new.png');
}

var items = [];
items.push(new item(400, 300, "epic cool sword", () => {ui.push(new noti("New item! The Epic Cool Sword is very amazing! lets gooo!"));}, 0));

var worldData = [items];
var curentWorld = 0;

var ui = [];

var inp_name;
var inp_start;

var running = false;

function setup() {
  createCanvas(canwidth, canheight);

  inp_name = createInput('Name');
  inp_start = createButton('Start');
  inp_start.mousePressed(() => {
    if (running == false){
      if (inp_name.value() != 'Name'){
        running = true;
      }
    }
    player.name = inp_name.value();
  });

  socket = io.connect('https://crath.herokuapp.com/');
  socket.on('newPos', newOtherPlayer);
  socket.on('itemChange', itemChange);
}

function itemChange(data){
  if (data.world == curentWorld){
    worldData[0] = data.wd;
    console.log(data);
  }
}
function newOtherPlayer(data){
  if (data.world == curentWorld){
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
}

var framecount = 0;
function draw() {
  if (running == true){
    background(52);
    framecount++;

    player.show();

    //render WorldData
    for (var i = 0; i < worldData[0].length; i++) {
      worldData[0][i].show();
      worldData[0][i].check();
    }

    for (var i = 0; i < ui.length; i++) {
      ui[i].show();
    }

    if (keyIsDown(65)) {
      player.x = player.x - player.speed;
      sendPlayerData();
    }
    if (keyIsDown(68)) {
      player.x = player.x + player.speed;
      sendPlayerData();
    }
    if (keyIsDown(83)) {
      player.y = player.y + player.speed;
      sendPlayerData();
    }
    if (keyIsDown(87)) {
      player.y = player.y - player.speed;
      sendPlayerData();
    }

    for (var i = 0; i < people.length; i++) {
      people[i].show();
    }
  }else{
    console.log("Game not running (Please enter your name)");
  }
}


function sendPlayerData(){
  var data = {
    x: player.x,
    y: player.y,
    id: player.id,
    name: player.name,
    world: curentWorld
  }

  socket.emit('newPos', data);
}

function sendWorldData(){
  var data = {
    wd: worldData[0],
    world: curentWorld
  }

  socket.emit('itemChange', data);
}
