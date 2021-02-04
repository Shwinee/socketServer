function noti(text_string){

  this.y = 64;
  this.x = [];

  this.text_string = text_string;

  this.curentFrame = 0;

  this.x = [590, 585, 580, 575, 570, 565, 560, 555, 550, 545, 540, 535, 530, 525, 520, 515, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, , 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 515, 520, 535, 550, 570, 580, 600];
  this.show = function(){
    this.curentFrame++;
    if (this.curentFrame <= this.x.length){
      image(ui_new, this.x[this.curentFrame]-50, this.y, 124, 32);
      fill(91, 110, 225);
      textSize(8);
      text(this.text_string, this.x[this.curentFrame]-10, this.y+5, 89);
    }
  }
}

var ui_inventory = new ui_1();

function ui_1(){
  this.x = 425;
  this.y = 20;

  this.show = function(){
    fill(0, 0);
    rect(this.x, this.y, 169, 40); //background

    image(ui_inventory_small, this.x+2, this.y, 40, 40);
    image(ui_inventory_small, this.x+42, this.y, 40, 40);
    image(ui_inventory_small, this.x+84, this.y, 40, 40);
    image(ui_inventory_small, this.x+126, this.y, 40, 40);
  }

  this.hilightTile = function(tile){
    tile--;
  }
}
