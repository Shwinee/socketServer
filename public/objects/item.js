function item(x, y, name, callback, id){
  this.x = x;
  this.y = y;

  this.name = name;

  this.callback = callback;

  this.id = id;

  this.show = function(){
    fill(0, 0, 255);
    rect(this.x, this.y, 16, 16);
  }

  this.check = function(){
    if (Math.abs(player.x - this.x) <= 30){
      if (Math.abs(player.y - this.y) <= 30){
        //draw tip
        image(hilight, this.x-2, this.y-2, 20, 20);
        //if e pick up
        if (keyIsDown(69)) {
          this.callback();
          player.inventory.push(worldData[0][this.id]);
          worldData[0].splice(this.id, 1);
          //send new world data
          sendWorldData();
        }
      }
    }
  }
}
