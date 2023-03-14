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

    sell(char, item) {
      Object.keys(this.items).forEach(cat => {
        this.items[cat].forEach(obj => {
          if (obj.img === item) {
            char.money += obj.sell_price
            char.dropitem()
            alert(`Sold ${obj.name} for $${obj.sell_price}`)
            return true;
          }
        })
      })
      return false;
    }
}