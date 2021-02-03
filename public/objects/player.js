function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function player(color){
  this.x = canwidth / 2;
  this.y = 300;

  this.id = randomNumber(0, 500);

  this.hp = 100;

  this.thirst = 50;
  this.hunger = 50;

  this.size = 32;
  this.speed = 2;

  this.inventory = [];
  this.maxinven = 4;

  //HIT BOX
  this.direction = "left";

  this.color = color;

  this.name;

  this.show = function(){
    if (this.color){
      if (this.color == 'red'){
        image(redSprite, player.x, player.y, player.size, player.size);
      }
      if (this.color == 'blue'){
        image(blueSprite, player.x, player.y, player.size, player.size);
      }
      if (this.color == 'white'){
        image(whiteSprite, player.x, player.y, player.size, player.size);
      }
      if (this.color == 'black'){
        image(blackSprite, player.x, player.y, player.size, player.size);
      }
    }else{
      fill(0, 255, 0);
      rect(player.x, player.y, player.size, player.size);
    }
  }

  this.neweffect = function(effect){
    this.effects.push(effect);
  }

  this.dmg = function(dmgtaken){
    this.hp = this.hp - dmgtaken;
  }
}
