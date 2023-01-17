class Char {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.money = 2000;
        this.hunger = 100;
        this.facing= "down";
        this.alive = true;
        this.moving_right = false;
        this.moving_left = false;
        this.moving_down = false;
        this.moving_up = false;
        this.holding = ["rock","grunk1","pickaxe","",""];
        this.holding_amount = [5,2,1,0,0];
        this.selected = 0;
        setInterval(this.hungry.bind(this), 5000);
    }

    additem(item) {
      if (this.holding.includes(item)) {
        if (this.holding_amount[this.holding.indexOf(item)] < 9) {
          this.holding_amount[this.holding.indexOf(item)] += 1;
          return true
        } else {
          alert("Cant hold anymore of this item")
          return false
        }
      } else if (this.holding.includes("")) {
        let index9 = this.holding.indexOf("");
        this.holding[index9] = item;
        this.holding_amount[index9] += 1;
        return true
      } else {
        alert("Inventory is full")
        return false
      }
    }

    dropitem() {
      if (this.holding_amount[this.selected] > 0) {
        this.holding_amount[this.selected] -= 1
        if (this.holding_amount[this.selected] === 0) {
          this.holding[this.selected] = "";
        }
      }
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
          ctx.beginPath();
          ctx.arc(this.x, this.y + 15, 10, 0, 2 * Math.PI);
          ctx.fillStyle = 'black';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.x, this.y + 15, 10, 0, (2 * Math.PI) * (this.hunger/100), false);
          ctx.fillStyle = `#${(this.hunger < 50 ? 255 : 51 + Math.floor(((100-this.hunger) / 100) * 204)).toString(16)}${(this.hunger >= 50 ? 255 : (51 + Math.floor(((this.hunger) / 100) * 204))).toString(16)}51`;
          ctx.fill();
      }

    hungry() {
      if (this.alive) {
        this.hunger -= 1
        if (this.hunger <= 0) {
          this.alive = false
        }
      }
    }
}