

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const walkable = [0, 9, 27];
  const mineable = [50];
  const placeable = [0, 1, 50];
  const holding = ["rock","grunk1","pickaxe","",""];
  const holding_amount = [5,1,0,0,0];

  const dict = {
    "rock": 50,
    "grass": 0,
    "wood": 1,
    "black": -1,
    "pickaxe": 101
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
    const char = new Char(419,277);
    const stage = new Map();

    let selected = 0;

    function inhouse (x,y) {
      return x > 270 && y < 270
    }

    function add_action(e) {
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
      if (e.keyCode == 32) {
        e.preventDefault();
        let next_block = nextblockcheck(char.x,char.y);
        let idx = next_block[1] * stage.cols + next_block[0];
        let next_pix4 = nextpix();
        let block_in_house = inhouse(next_pix4[0], next_pix4[1])
        let can_place;
        if (block_in_house){
          can_place = (stage.house_map[idx] === 0 && placeable.includes(stage.house_floor[idx]));
        } else {
          can_place = (stage.map[idx] === 0 && placeable.includes(stage.floor[idx]));
        }
        if (!can_place && placeable.includes(dict[holding[selected]])) {
          alert("Can't place here")
        }
        console.log(dict[holding[selected]])
        switch(holding[selected]){
          case "":
            if (stage.map[idx] instanceof Seed) {
              if (stage.map[idx].stage === 7) {
                holding[selected] = stage.map[idx].type.concat(stage.map[idx].stage)
                holding_amount[selected] += 1
                stage.map[idx] = 0;
              }
            }
            break;
          case "rock":
            if (block_in_house) {
              if (can_place) {
                if (holding_amount[selected] >= 1) {
                  holding_amount[selected] -= 1;
                  stage.house_map[idx] = 50;
                  if (holding_amount[selected] === 0) {
                    holding[selected] = "";
                  }
                }
              }
            } else {
              if (can_place) {
                if (holding_amount[selected] >= 1) {
                  holding_amount[selected] -= 1;
                  if (holding_amount[selected] === 0) {
                    holding[selected] = "";
                  }
                }
                stage.map[idx] = 50;
              }
            }
            break;
          case "grunk1":
            if (stage.floor[idx] === 9) {
              if (holding_amount[selected] >= 1) {
                holding_amount[selected] -= 1;
                if (holding_amount[selected] === 0) {
                  holding[selected] = "";
                }
              } 
              let g = new Seed("grunk");
              stage.map[idx] = g;
            }
            break;
          case "pickaxe":
            if (mineable.includes(stage.map[idx])) {
              if (holding.includes(getKeyByValue(dict,stage.map[idx]))) {
                let hold_item = getKeyByValue(dict,stage.map[idx])
                if (holding_amount[holding.indexOf(hold_item)] <= 8){
                  holding_amount[holding.indexOf(hold_item)] += 1;
                  stage.map[idx] = 0;
                  console.log(holding_amount)
                }
              } else {
                if (holding.includes("")) {
                  let new_idx = holding.indexOf("")
                  holding[new_idx] = getKeyByValue(dict,stage.map[idx])
                  holding_amount[new_idx] += 1
                  stage.map[idx] = 0;
                } else {
                  alert("Inventory is full!")
                }
              }

            }
        }
      }
      if (e.keyCode == 49) {
        selected = 0
      }
      if (e.keyCode == 50) {
        selected = 1
      }
      if (e.keyCode == 51) {
        selected = 2
      }
      if (e.keyCode == 52) {
        selected = 3
      }
      if (e.keyCode == 53) {
        selected = 4
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

  

  const updateAll = () => {
    document.onkeydown = add_action;
    document.onkeyup = remove_action;
    move();
    printlayer1();
    printlayer2();
    char.printchar(ctx);
    printbar()
    // printblock();
    printnextblock();
    window.requestAnimationFrame(updateAll);
  };

  window.onload = () => {
    window.requestAnimationFrame(updateAll);
  };

  const move = () => {
    let nextpixel = nextpix();
    let nextblock = currentblockcheck(nextpixel[0], nextpixel[1])
    let next_block_idx = nextblock[1] * stage.cols + nextblock[0];
    if (inhouse(char.x,char.y)) {
      let next_pixel_x_y = nextpix();
      if (char.moving_right) {
        char.facing = "right";
        if (walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1])  && inbounds())
        char.x+=1;
      }
      if (char.moving_left) {
        char.facing = "left"
        if (walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
        char.x-=1;
      }
      if (char.moving_up) {
        char.facing = "up"
        if (walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
        char.y-=1;
      }
      if (char.moving_down) {
        char.facing = "down"
        if (stage.house_map[next_block_idx] === 1) {
          char.y+=1;
        }
        if (walkable.includes(stage.house_map[next_block_idx]) && inhouse(next_pixel_x_y[0], next_pixel_x_y[1]) && inbounds())
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
        if (walkable.includes(stage.map[next_block_idx]) && inbounds())
        char.x+=1;
      }
      if (char.moving_left) {
        char.facing = "left"
        if (walkable.includes(stage.map[next_block_idx]) && inbounds())
        char.x-=1;
      }
      if (char.moving_up) {
        char.facing = "up"
        if (walkable.includes(stage.map[next_block_idx]) && inbounds())
        char.y-=1;
      }
      if (char.moving_down) {
        char.facing = "down"
        if (walkable.includes(stage.map[next_block_idx]) && inbounds())
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
        } else {
        if(stage.map[idx] === 50) {
          ctx.drawImage(rock, stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
        } 
        if (stage.map[idx] <= 29 && stage.map[idx] >= 5) {
          ctx.drawImage(eval(`house${stage.map[idx]-4}`), stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
        }
        if(stage.map[idx] instanceof Seed) {
          ctx.drawImage(eval(stage.map[idx].type.concat(stage.map[idx].stage)), stage.pixel_size * j, stage.pixel_size * i, stage.pixel_size, stage.pixel_size);
        }
      }
    }
  }
  }
  const printbar = () => {
    for (i = 0; i < holding.length; i++) {
      if (i === selected) {
        ctx.drawImage(inv_slot, stage.pixel_size * i, canvas.width, stage.pixel_size,stage.pixel_size)
      } else {
        ctx.drawImage(unselected_inv, stage.pixel_size * i, canvas.width, stage.pixel_size,stage.pixel_size)
      }
      if (holding[i] != "") {
        ctx.drawImage(eval(holding[i]), (stage.pixel_size * i) + (stage.pixel_size * (1/6)), canvas.width + (stage.pixel_size * (1/6)), stage.pixel_size*(4/6),stage.pixel_size*(4/6))
      }
      if (holding_amount[i] > 0) {
        ctx.drawImage(eval(`num${holding_amount[i]}`), (stage.pixel_size * i) + (stage.pixel_size * (4/6)), canvas.width + (stage.pixel_size * (4/6)), stage.pixel_size*(2/6),stage.pixel_size*(2/6))
      }
    }
  }

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
          next_x -= 1;
          next_y += 1;
          break;
        case "down_right":
          next_x += 1;
          next_y += 1;
      }
      return next_x + stage.pixel_size <= canvas.width && next_y + stage.pixel_size <= 600 && next_x >= 0 && next_y >= 0
      
  }

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

  const printnextblock = () => {
    if (holding[selected] != ""){
      let next_block = nextblockcheck(char.x,char.y);
      if (next_block[0] < 10 && next_block[1] < 10) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(eval(holding[selected]), stage.pixel_size * next_block[0], stage.pixel_size* next_block[1], stage.pixel_size, stage.pixel_size);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  

});
