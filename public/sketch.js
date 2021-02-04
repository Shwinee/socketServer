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
  ui_inventory_big = loadImage('sprites/ui/bigSlot.png');
  ui_inventory_small = loadImage('sprites/ui/normalSlot.png');
}

var items = [];
items.push(new item(400, 300, "epic cool sword", () => {ui.push(new noti("New item! The Epic Cool Sword is very amazing! lets gooo!"));}));
items.push(new item(200, 300, "kida epic cool sword", () => {ui.push(new noti("New item! The Kinda Epic Cool Sword is very amazing! lets gooo!"));}));

var worldData = [items];
var curentWorld = 0;

var ui = [];

var inp_name;
var inp_start;

var running = false;

function setup() {
  inp_name = createInput('Name');
  inp_start = createButton('Start');
  inp_start.mousePressed(() => {
    if (running == false){
      if (inp_name.value() != 'Name'){
        running = true;
        inp_name.remove();
        inp_start.remove();
      }
    }
    player.name = inp_name.value();
  });

  socket = io.connect('http://localhost:3000/');
  socket.on('newPos', newOtherPlayer);
  socket.on('itemChange', itemChange);



  createCanvas(canwidth, canheight);
}

function itemChange(dataa){
  if (dataa.world == curentWorld){
    console.log(dataa);
    if (dataa.change == 'remove'){
      //remove item with data.id
      worldData[0].splice(dataa.id);
    }
    if (dataa.change == 'add'){
      //add item with dataa.iteminfo
      worldData[0].push(new item(dataa.iteminfo.x, dataa.iteminfo.y, dataa.iteminfo.name, () => {"Am i ever going to use this?"}, worldData[0].length))
    }
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
    ui_inventory.show();
    //render WorldData
    for (var i = 0; i < worldData[0].length; i++) {
      worldData[0][i].id = i;
      worldData[0][i].show();
      worldData[0][i].check();
    }

    for (var i = 0; i < ui.length; i++) {
      ui[i].show();
    }

    //movement
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

    if (keyIsDown(81)){//drop item
      player.inventory_drop();
    }
    if (keyIsDown(49)){//hilight 1
      player.hilight = [false, false, false, false];
      player.hilight[0] = true;
    }
    if (keyIsDown(50)){//hilight 2
      player.hilight = [false, false, false, false];
      player.hilight[1] = true;
    }
    if (keyIsDown(51)){//hilight 3
      player.hilight = [false, false, false, false];
      player.hilight[2] = true;
    }
    if (keyIsDown(52)){//hilight 4
      player.hilight = [false, false, false, false];
      player.hilight[3] = true;
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

function sendItemData(cchange, id, itemData){
  var data = {
    change: cchange,
    iteminfo: itemData,
    id: id,
    world: curentWorld
  }

  socket.emit('itemChange', data);
}
