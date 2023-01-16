class Shop {
    constructor(char) {
        this.char = char
        this.items = ["grunk1", "pickaxe", "rock"]
        this.items_price = {
            "grunk1" : 30,
            "pickaxe" : 50,
            "rock" : 10
        }
        this.selected = 0;
    }

    print_shop(ctx) {
        ctx.drawImage(shop_items, 0, 0, 600,600)
        for (let i = 0; i < this.items.length; i++){
          if (i === this.selected) {
            ctx.drawImage(inv_slot, tWidth*2, tWidth * (i+1.5), tWidth/2,tWidth/2)
          } else {
            ctx.drawImage(unselected_inv, tWidth*2, tWidth * (i+1.5), tWidth/2,tWidth/2)
          }
        ctx.drawImage(eval(this.items[i]), tWidth*2.1, tWidth * (i+1.6), tWidth/3,tWidth/3)
        ctx.font = "normal 18px fantasy";
        ctx.fillStyle = "black";
        ctx.fillText(`$${this.items_price[this.items[i]]}`, tWidth*3, (tWidth * (i+2)));
        ctx.fillText(`${this.items[i]}`, tWidth*4, (tWidth * (i+2)));
      
        }
    }
}