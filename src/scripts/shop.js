class Shop {
    constructor(char) {
        this.fish_price = [5, 20, 30, 50, 75, 100, 1000]
        this.char = char
        this.items = ["grunk1", "pickaxe", "rock","bucket", "fishing_rod", "chest", "bed", "closet","shelf","table","stove", "stove","stove","stove"]
        this.items_buy_price = {
            "grunk1" : 30,
            "pickaxe" : 50,
            "rock" : 10,
            "bucket" : 100,
            "fishing_rod": 200,
            "chest": 350,
            "stove": 500,
            "bed": 180,
            "closet": 190,
            "shelf": 210,
            "table": 150
        }
        this.items_sell_price = {
          "grunk1" : 15,
          "pickaxe" : 25,
          "rock" : 5,
          "grunk7" : 70,
          "bucket" : 50,
          "fishing_rod": 200,
          "stove": 250,
          "bed": 90,
          "closet": 95,
          "shelf": 105,
          "table": 75,
          "searock": this.fish_price[0],
          "clam": this.fish_price[0],
          "kelp": this.fish_price[0],
          "log": this.fish_price[0],
          "anchovy": this.fish_price[1],
          "sardine": this.fish_price[1],
          "shad": this.fish_price[1],
          "salmon": this.fish_price[2],
          "carp": this.fish_price[2],
          "catfish": this.fish_price[2],
          "tuna": this.fish_price[4],
          "octopus": this.fish_price[4],
          "seacucumber": this.fish_price[4],
          "squid": this.fish_price[4],
          "sturgeon": this.fish_price[5],
          "rainbowtrout": this.fish_price[5],
          "supercucumber": this.fish_price[5],
          "pufferfish": this.fish_price[5],
          "legend": this.fish_price[6],
          "crimsonfish": this.fish_price[6],
          "angler": this.fish_price[6],
          "chest": 175

        }
        this.selection = 0;
    }

    print_shop(ctx) {
        ctx.drawImage(shop_items, 0, 0, 600,600)
        for (let i = 0; i < this.items.length; i++){
          if (i === this.selection) {
            ctx.drawImage(inv_slot, i <= 6 ? tWidth*2 : tWidth*5.5, i <= 6 ? tWidth * (i+1.5) : tWidth * ((i+1.5)-7), tWidth/2,tWidth/2)
          } else {
            ctx.drawImage(unselected_inv, i <= 6 ? tWidth*2 : tWidth*5.5,  i <= 6 ? tWidth * (i+1.5) : tWidth * ((i+1.5)-7), tWidth/2,tWidth/2)
          }
        ctx.drawImage(eval(this.items[i]), i <= 6 ? tWidth*2.1 : tWidth*5.6, i <= 6 ? tWidth * (i+1.6) : tWidth * ((i+1.6)-7), tWidth/3,tWidth/3)
        ctx.font = "normal 18px fantasy";
        ctx.fillStyle = "black";
        ctx.fillText(`$${this.items_buy_price[this.items[i]]}`, i <= 6 ? tWidth*3 : tWidth*6.5, i <= 6 ? (tWidth * (i+2)) : (tWidth * ((i+2)-7)));
        ctx.fillText(`${this.items[i]}`, i <= 6 ? tWidth*4 : tWidth*7.5, i <= 6 ? (tWidth * (i+2)) : (tWidth * ((i+2)-7)));
      
        }
    }
}