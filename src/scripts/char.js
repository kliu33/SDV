class Char {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.money = 200;
        this.hunger = 5;
        this.facing= "down";
        this.moving_right = false;
        this.moving_left = false;
        this.moving_down = false;
        this.moving_up = false;
        this.holding = ["rock","grunk1","pickaxe","",""];
        this.holding_amount = [5,2,0,0,0];
        this.selected = 0;
    }

    printchar(ctx) {
        switch(this.facing) {
          case "left":
            ctx.drawImage(char_left, this.x, this.y, tWidth, tWidth);
            break;
          case "right":
            ctx.drawImage(char_right, this.x, this.y, tWidth, tWidth);
            break;
          case "up":
            ctx.drawImage(char_up, this.x, this.y, tWidth, tWidth);
            break;
          case "down":
            ctx.drawImage(char_down, this.x, this.y, tWidth, tWidth);
            break;
          case "up_left":
            ctx.drawImage(char_up_left, this.x, this.y, tWidth, tWidth);
            break;
          case "up_right":
            ctx.drawImage(char_up_right, this.x, this.y, tWidth, tWidth);
            break;
          case "down_left":
            ctx.drawImage(char_down_left, this.x, this.y, tWidth, tWidth);
            break;
          case "down_right":
            ctx.drawImage(char_down_right, this.x, this.y, tWidth, tWidth);
        }
      }
}