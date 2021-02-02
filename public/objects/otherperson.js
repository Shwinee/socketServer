function other(playerdata){
  this.x = playerdata.x;
  this.y = playerdata.y;

  this.id = playerdata.id;

  this.show = function(){
    fill(255, 0, 0);
    rect(this.x, this.y, 32, 32);
  }
}
