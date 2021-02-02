function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function player(){
  this.x = canwidth / 2;
  this.y = 300;

  this.id = randomNumber(0, 500);

  this.hp = 100;

  this.pickuprange = 40;

  this.size = 32;

  this.speed = 2;

  this.defence = 0;

  this.inventory = [];
  this.maxinven = 4;

  //HIT BOX
  this.hitboxX = ["top left", "top right", "bottom left", "bottom right"];
  this.hitboxY = ["top left", "top right", "bottom left", "bottom right"];

  this.direction = "left";

  this.effects = [];

  this.show = function(){
    fill(0, 255, 0);
    rect(player.x, player.y, player.size, player.size);
  }

  this.neweffect = function(effect){
    this.effects.push(effect);
  }

  this.dmg = function(dmgtaken){
    this.hp = this.hp - dmgtaken;
  }
}
