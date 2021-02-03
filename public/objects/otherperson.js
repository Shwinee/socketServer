function other(playerdata){
  this.x = playerdata.x;
  this.y = playerdata.y;

  this.id = playerdata.id;

  this.color = playerdata.color;

  this.name = playerdata.name;

  this.show = function(){
    fill(255, 0, 0);
    if (this.color){
      if (this.color == 'red'){
        image(redSprite, this.x, this.y, 32, 32);
      }
    }else{
      text(this.name, this.x, this.y-10);
      rect(this.x, this.y, 32, 32);
    }
  }
}
