class Shop {
    constructor() {
        this.pages = ["Seeds", "Tools", "Decorations"]
        this.current_page = "Main"
        this.page_select = 0;
        this.selection = 0;
        this.display = {}
        this.items = {
          "Seeds": [{
            name: "Grunk",
            buy_price: 30,
            sell_price: 15,
            img: "grunk1"
          },
          {
            name: "Root",
            buy_price: 40,
            sell_price: 20,
            img: "root1"
          }],
          "Tools": [
            {
              name: "Pickaxe",
              buy_price: 200,
              sell_price: 100,
              img: "pickaxe" 
            },
            {
              name: "Fishing Rod",
              buy_price: 250,
              sell_price: 125,
              img: "fishing_rod" 
            },
            {
              name: "Bucket",
              buy_price: 200,
              sell_price: 100,
              img: "bucket"
            }
          ],
          "Decorations": [
            {
              name: "Chest",
              buy_price: 350,
              sell_price: 175,
              img: "chest",
            },
            {
              name: "Stove",
              buy_price: 500,
              sell_price: 250,
              img: "stove",
            },
            {
              name: "Closet",
              buy_price: 190,
              sell_price: 95,
              img: "closet",
            },
            {
              name: "Shelf",
              buy_price: 210,
              sell_price: 105,
              img: "shelf",
            },
            {
              name: "Table",
              buy_price: 150,
              sell_price: 75,
              img: "table",
            },
            {
              name: "Bed",
              buy_price: 180,
              sell_price: 90,
              img: "bed",
            },
            {
              name: "Cactus",
              buy_price: 100,
              sell_price: 50,
              img: "cactus",
            },
            {
              name: "Roses",
              buy_price: 200,
              sell_price: 100,
              img: "roses",
            },
            {
              name: "Violets",
              buy_price: 200,
              sell_price: 100,
              img: "violets",
            }
          ],
          "Fish": [
            { name: "Searock", sell_price: 5, img: "searock" },
            { name: "Clam", sell_price: 5, img: "clam" },
            { name: "Kelp", sell_price: 5, img: "kelp" },
            { name: "Log", sell_price: 5, img: "log" },
            { name: "Anchovy", sell_price: 20, img: "anchovy" },
            { name: "Sardine", sell_price: 20, img: "sardine" },
            { name: "Shad", sell_price: 20, img: "shad" },
            { name: "Salmon", sell_price: 45, img: "salmon" },
            { name: "Carp", sell_price: 45, img: "carp" },
            { name: "Catfish", sell_price: 45, img: "catfish" },
            { name: "Tuna", sell_price: 45, img: "tuna" },
            { name: "Octopus", sell_price: 75, img: "octopus" },
            { name: "Sea Cucumber", sell_price: 75, img: "seacucumber" },
            { name: "Squid", sell_price: 75, img: "squid" },
            { name: "Sturgeon", sell_price: 100, img: "sturgeon" },
            { name: "Rainbowtrout", sell_price: 100, img: "rainbowtrout" },
            { name: "Super Cucumber", sell_price: 100, img: "supercucumber" },
            { name: "Puffer Fish", sell_price: 100, img: "pufferfish" },
            { name: "Legend", sell_price: 1000, img: "Legend" },
            { name: "Crimson Fish", sell_price: 1000, img: "crimsonfish" },
            { name: "Angler", sell_price: 1000, img: "angler" },
          ]
        }
    }

    print_shop(ctx) {
        ctx.drawImage(shop_items, 0, 0, 600,600)
        if (this.current_page === "Main") {
          for (let i = 0; i < this.pages.length; i++) {
            ctx.font = "normal 40px fantasy";
            if (i === this.page_select) {
              ctx.fillStyle = "Green"
            } else {
              ctx.fillStyle = "black";
            }
            ctx.fillText(`${this.pages[i]}`, tWidth*3, (tWidth * (i+3)));
          }
        }
        else {
          for (let i = 0; i < this.display.length; i++){
            if (i === this.selection) {
              ctx.drawImage(inv_slot, i <= 6 ? tWidth*2 : tWidth*5.5, i <= 6 ? tWidth * (i+1.5) : tWidth * ((i+1.5)-7), tWidth/2,tWidth/2)
            } else {
              ctx.drawImage(unselected_inv, i <= 6 ? tWidth*2 : tWidth*5.5,  i <= 6 ? tWidth * (i+1.5) : tWidth * ((i+1.5)-7), tWidth/2,tWidth/2)
            }
          ctx.drawImage(eval(this.display[i].img), i <= 6 ? tWidth*2.1 : tWidth*5.6, i <= 6 ? tWidth * (i+1.6) : tWidth * ((i+1.6)-7), tWidth/3,tWidth/3)
          ctx.font = "normal 18px fantasy";
          ctx.fillStyle = "black";
          ctx.fillText(`$${this.display[i].buy_price}`, i <= 6 ? tWidth*3 : tWidth*6.5, i <= 6 ? (tWidth * (i+2)) : (tWidth * ((i+2)-7)));
          ctx.fillText(`${this.display[i].name}`, i <= 6 ? tWidth*4 : tWidth*7.5, i <= 6 ? (tWidth * (i+2)) : (tWidth * ((i+2)-7)));
          }
        }
    }

    set_page(){
      this.current_page = this.pages[this.page_select];
      this.display = this.items[this.current_page];
      this.selection = 0;
    }

    sell(char, item, broadcast) {
      Object.keys(this.items).forEach(cat => {
        this.items[cat].forEach(obj => {
          if (obj.img === item) {
            char.money += obj.sell_price
            char.dropitem()
            broadcast(`Sold ${obj.name} for $${obj.sell_price}`)
            return obj;
          }
        })
      })
      return false;
    }
}