document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const one_of = ["pickaxe", "bucket", "fishing_rod"];

  const char = new Char(419,277); //STARTING LOCATION FOR CHARACTER
  const stage = new Map();
  const shop = new Shop(char);
  const global_bucket = new Bucket();
  const global_rod = new FishingRod();

  let currentchest;
  let inshop = false;

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
  function inhouse (x,y) {
    return x > 270 && y < 270
  }

  const updateAll = () => {
    if (char.alive) {
      document.onkeydown = add_action;
      document.onkeyup = remove_action;
      move();
      printlayer1();
      printlayer2();
      char.printchar(ctx);
      printbar()
      if (currentchest instanceof Chest){
        currentchest.openchest(char, ctx)
      }
      printnextblock();
      if (inshop) {
        shop.print_shop(ctx)
      }
      window.requestAnimationFrame(updateAll);
    } else {
      printover();
    }
  };

  window.onload = () => {
    window.requestAnimationFrame(updateAll);
  };

  function add_action(e) {
    
    if (currentchest instanceof Chest) {
      let len = currentchest.contents.length;
      if (e.keyCode == 27) {
        currentchest = "";
      }
      if (e.keyCode == 65) {
        if (currentchest.selection != 0) {
          if (currentchest.selection != (len/2)){
            currentchest.selection -= 1
          }
        }
      }
      if (e.keyCode == 68) {
        if (currentchest.selection != ((len/2)-1) && currentchest.selection != len-1){
          currentchest.selection += 1
        }
      }
      if (e.keyCode == 83) {
          if (currentchest.selection <= 5) {
            currentchest.selection += 6
          }
      }
      if (e.keyCode == 87) {
          if (currentchest.selection >5){
            currentchest.selection -= 6
          }
      }
      if (e.keyCode == 32) {
        e.preventDefault();
        currentchest.takeitem(char)
      }
    } else if (inshop) {
        if (e.keyCode == 27) {
          inshop = false;
        }
        if (e.keyCode == 87) {
          if (shop.selection != 0 && shop.selection != 7) {
            shop.selection -= 1
          }
        }
        if (e.keyCode == 83) {
          if (shop.selection != shop.items.length - 1 && shop.selection != 6) {
            shop.selection += 1
          }
        }
        if (e.keyCode == 68) {
          if (shop.selection < 7) {
            shop.selection += 7
          }
        }
        if (e.keyCode == 65) {
          if (shop.selection >= 7) {
            shop.selection -= 7
          }
        }
        if (e.keyCode == 32) {
          e.preventDefault();
          let item = shop.items[shop.selection]
          let price = shop.items_buy_price[item];
          if (char.money >= price) {
              if (char.holding.includes(item) && one_of.includes(item)) {
                alert("Can only have one of this item!")
              } else {
                char.money-=price;
                char.additem(item)
              }
            }  else {
            alert("Not enough money")
          }
        }
      } else {
      if (e.keyCode == 68) {
        char.moving_right = true;
      }
      if (e.keyCode == 65) {
        char.moving_left = true;
      }
      if (e.keyCode == 87) {
        char.moving_up = true
      }
      if (e.keyCode == 83) {
        char.moving_down = true
      }
      if (e.keyCode == 8) {
        char.dropitem();
      }
      if (e.keyCode == 32) {
        e.preventDefault();
        let next_block = nextblockcheck(char.x,char.y);
        let idx = next_block[1] * stage.cols + next_block[0];
        let next_pix4 = nextpix();
        let block_in_house = inhouse(next_pix4[0], next_pix4[1])
        let can_place;
        if (block_in_house){
          can_place = (stage.house_map[idx] === 0 && stage.placeable.includes(stage.house_floor[idx]));
        } else {
          can_place = (stage.map[idx] === 0 && stage.placeable.includes(stage.floor[idx]));
        } 
        if (block_in_house && stage.house_map[idx] instanceof Stove && char.holding[char.selected] != ""){ 
          stage.house_map[idx].additem(char, char.holding[char.selected])
        } else if (!block_in_house && stage.map[idx] instanceof Stove && char.holding[char.selected] != "") {
          stage.map[idx].additem(char, char.holding[char.selected])
        } else if (block_in_house && stage.house_map[idx] instanceof Chest && char.holding[char.selected] != ""){ 
          stage.house_map[idx].additem(char, char.holding[char.selected])
        } else if (!block_in_house && stage.map[idx] instanceof Chest && char.holding[char.selected] != "") {
          stage.map[idx].additem(char, char.holding[char.selected])
        } else if(stage.map[idx] === 30) {
          if(char.holding[char.selected] == ""){
            inshop = true;
          } else if (char.holding[char.selected] in shop.items_sell_price) {
            let price2 = shop.items_sell_price[char.holding[char.selected]];
            char.money += price2;
            char.dropitem();
          } else {
            alert("Can't sell this item")
          }
        } else if (stage.house_map[idx] === 51 && char.holding[char.selected] === "") {
          alert(`${stage.fun_facts[Math.floor(Math.random()*stage.fun_facts.length)]}`)
        } else if (!can_place && stage.placeable.includes(stage.dict[char.holding[char.selected]])) {
          alert("Can't place here")
        } else {
        switch(char.holding[char.selected]){
          case "":
            if (stage.map[idx] instanceof Seed) {
              if (stage.map[idx].stage === 7) {
                char.holding[char.selected] = stage.map[idx].type.concat(stage.map[idx].stage)
                char.holding_amount[char.selected] += 1
                stage.map[idx] = 0;
              }
            } else if (stage.map[idx] instanceof Chest){
              currentchest = stage.map[idx]
            } else if (stage.house_map[idx] instanceof Chest) {
              currentchest = stage.house_map[idx]
            } else if (stage.map[idx] instanceof Stove){
              stage.map[idx].eat(char)
            } else if (stage.house_map[idx] instanceof Stove) {
              stage.house_map[idx].eat(char)
            }
            break;
          case "rock":
            if (block_in_house) {
              if (can_place) {
                char.dropitem();
                stage.house_map[idx] = 50;
              }
            } else {
              if (can_place) {
                char.dropitem();
                stage.map[idx] = 50;
              }
            }
            break;
          case "grunk1":
            if (stage.floor[idx] === 9 && stage.map[idx] === 0) {
              char.dropitem(); 
              let g = new Seed("grunk");
              stage.map[idx] = g;
            }
            break;
          case "root1":
            if (stage.floor[idx] === 9 && stage.map[idx] === 0) {
              char.dropitem(); 
              let g = new Seed("root");
              stage.map[idx] = g;
            }
            break;
          case "pickaxe":
            if (block_in_house) {
              if (stage.mineable.includes(stage.house_map[idx])) {
                char.additem(getKeyByValue(stage.dict,stage.house_map[idx]))
                stage.house_map[idx] = 0;
              }
            } else {
            if (stage.mineable.includes(stage.map[idx])) {
              char.additem(getKeyByValue(stage.dict,stage.map[idx]))
              stage.map[idx] = 0;
            } 
          }
            break;
          case "bucket": 
            if (stage.map[idx] instanceof Seed) {
              if (global_bucket.use()) {
                stage.map[idx].water();
              }
            } else if (stage.floor[idx] == 6){ 
              global_bucket.fill();
            }
            break;
          case "fishing_rod":
            if (stage.floor[idx] === 6) {
              global_rod.use(char);
            } else {
              alert("Cannot fish here")
            }
            break;
          case "chest":
            if (block_in_house){
              if(can_place){
                char.dropitem();
                stage.house_map[idx] = new Chest;
              }
            } else {
              if(can_place){
                char.dropitem();
                stage.map[idx] = new Chest;
              }
            }
            break;
          case "stove":
            if (block_in_house){
              if(can_place){
                char.dropitem();
                stage.house_map[idx] = new Stove;
                  
              }
            } else {
              if(can_place){
                char.dropitem();
                stage.map[idx] = new Stove;
              }
            }
            break;
          case "shelf":
            if (block_in_house) {
              if (can_place) {
                char.dropitem();
                stage.house_map[idx] = 51;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place in house")
            }
            break;
          case "bed":
            if (block_in_house) {
              if (can_place) {
                char.dropitem();
                stage.house_map[idx] = 52;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place in house")
            }
            break;
          case "closet":
            if (block_in_house) {
              if (can_place) {
                char.dropitem();
                stage.house_map[idx] = 53;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place in house")
            }
            break;
          case "table":
            if (block_in_house) {
              if (can_place) {
                char.dropitem();
                stage.house_map[idx] = 54;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place in house")
            }
            break;
          case "cactus":
            if (stage.floor[idx] === 4 || stage.floor[idx] === 5) {
              if (can_place) {
                char.dropitem();
                stage.map[idx] = 55;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place on sand")
            }
            break;
          case "roses":
            if (!block_in_house && stage.floor[idx] === 0) {
              if (can_place) {
                char.dropitem();
                stage.map[idx] = 56;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place on grass")
            }
            break;
          case "violets":
            if (!block_in_house && stage.floor[idx] === 0) {
              if (can_place) {
                char.dropitem();
                stage.map[idx] = 57;
              } else {
                alert("Cant place here")
              }
            } else {
              alert("Can only place on grass")
            }
            break;
          }
        }
      }
      if (e.keyCode == 49) {
        char.selected = 0
      }
      if (e.keyCode == 50) {
        char.selected = 1
      }
      if (e.keyCode == 51) {
        char.selected = 2
      }
      if (e.keyCode == 52) {
        char.selected = 3
      }
      if (e.keyCode == 53) {
        char.selected = 4
      }
    }
  }

  function remove_action(e) {
    if (e.keyCode == 68) {
      char.moving_right = false;
    }
    if (e.keyCode == 65) {
      char.moving_left = false;
    }
    if (e.keyCode == 87) {
      char.moving_up = false;
    }
    if (e.keyCode == 83) {
      char.moving_down = false;
    }
  }

  const move = () => {
    let nextpixel = nextpix();
    let nextblock = currentblockcheck(nextpixel[0], nextpixel[1])
    let next_block_idx = nextblock[1] * stage.cols + nextblock[0];
    if (inhouse(char.x,char.y)) {
      let next_pixel_x_y = nextpix();
      if (char.moving_right) {
        char.facing = "right";
        if (stage.walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1])  && inbounds())
        char.x+=1;
      }
      if (char.moving_left) {
        char.facing = "left"
        if (stage.walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
        char.x-=1;
      }
      if (char.moving_up) {
        char.facing = "up"
        if (stage.walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
        char.y-=1;
      }
      if (char.moving_down) {
        char.facing = "down"
        if (stage.house_map[next_block_idx] === 1) {
          char.y+=1;
        }
        if (stage.walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
        char.y+=1;
      }
      if (char.moving_up && char.moving_left) {
        char.facing = "up_left"
      }
      if (char.moving_down && char.moving_left) {
        char.facing = "down_left"
      }
      if (char.moving_up && char.moving_right) {
        char.facing = "up_right"
      }
      if (char.moving_down && char.moving_right) {
        char.facing = "down_right"
      }
    } else {
      if (char.moving_right) {
        char.facing = "right";
        if (stage.walkable.includes(stage.map[next_block_idx]) && stage.walkable.includes(stage.floor[next_block_idx]) && inbounds()) 
        char.x+=1;
      }
      if (char.moving_left) {
        char.facing = "left"
        if (stage.walkable.includes(stage.map[next_block_idx]) && stage.walkable.includes(stage.floor[next_block_idx]) && inbounds())
        char.x-=1;
      }
      if (char.moving_up) {
        char.facing = "up"
        if (stage.walkable.includes(stage.map[next_block_idx]) && stage.walkable.includes(stage.floor[next_block_idx]) && inbounds())
        char.y-=1;
      }
      if (char.moving_down) {
        char.facing = "down"
        if (stage.walkable.includes(stage.map[next_block_idx]) && stage.walkable.includes(stage.floor[next_block_idx]) && inbounds())
        char.y+=1;
      }
      if (char.moving_up && char.moving_left) {
        char.facing = "up_left"
      }
      if (char.moving_down && char.moving_left) {
        char.facing = "down_left"
      }
      if (char.moving_up && char.moving_right) {
        char.facing = "up_right"
      }
      if (char.moving_down && char.moving_right) {
        char.facing = "down_right"
      }
    }
  }

  // PRINTING 

  const printlayer1 = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stage.rows; i++) {
      for (let j = 0; j < stage.cols; j++) {
        let idx = i * stage.cols + j;
        if (inhouse(char.x,char.y)) {
          if(stage.house_floor[idx] === -1) {
            ctx.fillStyle = "black";
            ctx.fillRect(stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.house_floor[idx] === 1) {
            ctx.drawImage(wood, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
        } else {
          if(stage.floor[idx] === 0) {
            ctx.drawImage(grass, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.floor[idx] === 9) {
            ctx.drawImage(soil, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.floor[idx] === 4) {
            ctx.drawImage(cliff, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.floor[idx] === 5) {
            ctx.drawImage(sand, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.floor[idx] === 6) {
            ctx.drawImage(water, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
        }
      }
    }
  }

  const printlayer2 = () => {
    for (let i = 0; i < stage.rows; i++) {
      for (let j = 0; j < stage.cols; j++) {
        let idx = i * stage.cols + j;
        if (inhouse(char.x,char.y)) {
          if(stage.house_map[idx] === 50) {
            ctx.drawImage(rock, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.house_map[idx] === 51) {
            ctx.drawImage(shelf, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.house_map[idx] === 52) {
            ctx.drawImage(bed, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.house_map[idx] === 53) {
            ctx.drawImage(closet, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.house_map[idx] === 54) {
            ctx.drawImage(table, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.house_map[idx] instanceof Chest) {
            ctx.drawImage(chest, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.house_map[idx] instanceof Stove) {
            if(!stage.house_map[idx].cooking) {
              ctx.drawImage(stove, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
            } else {
              ctx.drawImage(stove_cooking, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
            }
          }
        } else {
          if(stage.map[idx] === 50) {
            ctx.drawImage(rock, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.map[idx] === 55) {
            ctx.drawImage(cactus, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.map[idx] === 56) {
            ctx.drawImage(roses, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if(stage.map[idx] === 57) {
            ctx.drawImage(violets, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          } 
          if (stage.map[idx] <= 29 && stage.map[idx] >= 5) {
            ctx.drawImage(eval(`house${stage.map[idx]-4}`), stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.map[idx] instanceof Seed) {
            if (!stage.map[idx].life) {
              stage.map[idx] = 0
            } else {
              ctx.drawImage(eval(stage.map[idx].type.concat(stage.map[idx].stage)), stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
              ctx.beginPath();
              ctx.arc((stage.pixel_size * j) + 15, (stage.pixel_size * i) + 15, 10, 0, 2 * Math.PI);
              ctx.fillStyle = 'black';
              ctx.fill();
              ctx.beginPath();
              ctx.arc((stage.pixel_size * j) + 15, (stage.pixel_size * i) + 15, 10, 0, (2 * Math.PI) * (stage.map[idx].water_level/100), false);
              if (stage.map[idx].water_level > 40) {
                ctx.fillStyle = '#33ccff';
              } else {
                ctx.fillStyle = 'brown';
              }
              ctx.fill();
            }
          }
          if(stage.map[idx] instanceof Chest) {
            ctx.drawImage(chest, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
          if(stage.map[idx] instanceof Stove) {
            if(!stage.map[idx].cooking) {
              ctx.drawImage(stove, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
            } else {
              ctx.drawImage(stove_cooking, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
            }
          }
          if(stage.map[idx]===30) {
            ctx.drawImage(shop_guy, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
          }
        }
      }
    }
  }
  
  const printbar = () => {
    ctx.drawImage(inv_bar, 0, canvas.width, canvas.width,stage.pixel_size)
    for (i = 0; i < char.holding.length; i++) {
      if (i === char.selected) {
        ctx.drawImage(inv_slot, stage.pixel_size * i, canvas.width, stage.pixel_size,stage.pixel_size)
      } else {
        ctx.drawImage(unselected_inv, stage.pixel_size * i, canvas.width, stage.pixel_size,stage.pixel_size)
      }
      if (char.holding[i] != "") {
        ctx.drawImage(eval(char.holding[i]), (stage.pixel_size * i) + (stage.pixel_size * (1/6)), canvas.width + (stage.pixel_size * (1/6)), stage.pixel_size*(4/6),stage.pixel_size*(4/6))
        if (char.holding[i] == "bucket") {
          ctx.font = "bold 20px brush script mt";
          ctx.fillStyle = "black";
          ctx.fillText(`${global_bucket.level}%`, (stage.pixel_size * i) + (stage.pixel_size * (1/6)), canvas.width + (stage.pixel_size * (1/3)));
        }
        if (char.holding[i] == "fishing_rod") {
          ctx.font = "bold 20px brush script mt";
          ctx.fillStyle = "black";
          ctx.fillText(`${global_rod.durability}%`, (stage.pixel_size * i) + (stage.pixel_size * (1/6)), canvas.width + (stage.pixel_size * (1/3)));
        }
      }
      if (char.holding_amount[i] > 1) {
        ctx.drawImage(eval(`num${char.holding_amount[i]}`), (stage.pixel_size * i) + (stage.pixel_size * (4/6)), canvas.width + (stage.pixel_size * (4/6)), stage.pixel_size*(2/6),stage.pixel_size*(2/6))
      }
    }
    ctx.font = "italic 30px brush script mt";
    ctx.fillStyle = "#b3b300";
    ctx.fillText(`$${char.money}`, stage.pixel_size * char.holding.length, canvas.width + (stage.pixel_size)/1.5);
    ctx.font = "bold 20px serif";
    ctx.fillStyle = "black";
    ctx.fillText(`${char.holding[char.selected]}`, stage.pixel_size * (char.holding.length+1.3), canvas.width + (stage.pixel_size)/1.5);
    ctx.font = "bold 30px serif";
    ctx.fillStyle = "black";
    ctx.fillText(`${stage.hours}:${stage.minutes < 10 ? `0${stage.minutes}` : stage.minutes}`, stage.pixel_size * (char.holding.length+3.5), canvas.width + (stage.pixel_size)/1.5);
  }

  const printnextblock = () => {
    if (char.holding[char.selected] != ""){
      let next_block = nextblockcheck(char.x,char.y);
      if (next_block[0] < 10 && next_block[1] < 10) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(eval(char.holding[char.selected]), stage.pixel_size * next_block[0], stage.pixel_size* next_block[1], stage.pixel_size, stage.pixel_size);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  const printover = () => {
    ctx.drawImage(game_over, 0, 0, canvas.width, canvas.height)
  }

  // HELPER FUNCTIONS

  const nextpix = () => {
    let next_x = char.x
    let next_y = char.y
    switch(char.facing) {
      case "left":
        next_x -= (stage.pixel_size/2) + 1;
        break;
      case "right":
        next_x += (stage.pixel_size/2) + 1;
        break;
      case "down":
        next_y += (stage.pixel_size/2) + 1;
        break;
      case "up":
        next_y -= (stage.pixel_size/2) + 1;
        break;
      case "up_left":
        next_x -= (stage.pixel_size/2) + 1;
        next_y -= (stage.pixel_size/2) + 1;
        break;
      case "up_right":
        next_x += (stage.pixel_size/2) + 1;
        next_y -= (stage.pixel_size/2) + 1;
        break;
      case "down_left":
        next_x -= (stage.pixel_size/2) + 1;
        next_y += (stage.pixel_size/2) + 1;
        break;
      case "down_right":
        next_x += (stage.pixel_size/2) + 1;
        next_y += (stage.pixel_size/2) + 1;
    }
    return [next_x, next_y]
  }

  const inbounds = () => {
      let next_x = char.x
      let next_y = char.y
      switch(char.facing) {
        case "left":
          next_x -= 1;
          break;
        case "right":
          next_x += 1;
          break;
        case "down":
          next_y += 1;
          break;
        case "up":
          next_y -= 1;
          break;
        case "up_left":
          next_x -= 1;
          next_y -= 1;
          break;
        case "up_right":
          next_x += 1;
          next_y -= 1;
          break;
        case "down_left":
          next_x -= 1;4
          next_y += 1;
          break;
        case "down_right":
          next_x += 1;
          next_y += 1;
      }
      return next_x + stage.pixel_size <= canvas.width && next_y + stage.pixel_size <= 600 && next_x >= 0 && next_y >= 0
      
  }

  // function pickup() {
  //   let next_block = nextblockcheck(char.x,char.y);
  //   let idx = next_block[1] * stage.cols + next_block[0];
  //   let next_pix4 = nextpix();
  //   let block_in_house = inhouse(next_pix4[0], next_pix4[1])
  // }

  function currentblockcheck(x,y) {
    let block_x = Math.floor((x+(stage.pixel_size/2))/stage.pixel_size)
    let block_y = Math.floor((y+(stage.pixel_size/2))/stage.pixel_size)
    return [block_x, block_y]
  }

  function nextblockcheck(x,y) {
    let block_x = Math.floor((x+(stage.pixel_size/2))/stage.pixel_size)
    let block_y = Math.floor((y+(stage.pixel_size/2))/stage.pixel_size)
    switch(char.facing) {
      case "left":
        block_x -= 1;
        break;
      case "right":
        block_x += 1;
        break;
      case "down":
        block_y += 1;
        break;
      case "up":
        block_y -= 1;
        break;
      case "up_left":
        block_x -= 1;
        block_y -= 1;
        break;
      case "up_right":
        block_x += 1;
        block_y -= 1;
        break;
      case "down_left":
        block_x -= 1;
        block_y += 1;
        break;
      case "down_right":
        block_x += 1;
        block_y += 1;
    }
    return [block_x, block_y]
  }

  

});
