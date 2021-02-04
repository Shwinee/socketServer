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

  this.hilight = [false, false, false, false];

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

  this.inventory_drop = function(){
    for (var i = 0; i < this.hilight.length; i++) {
      if (this.hilight[i] == true){
        if (this.inventory[i]){
          //drop this item
          this.inventory[i].x = player.x;
          this.inventory[i].y = player.y;

          for (var x = 0; x < worldData[0].length; x++) {
            worldData[0][x].id = x;
          }
          this.inventory[i].id = worldData[0].length;
          worldData[0].push(this.inventory[i]);
          sendItemData('add', undefined, this.inventory[i]);


          this.inventory.splice(i, 1);
        }
      }
    }
  }
}
