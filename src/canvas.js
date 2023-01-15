// const Seed = require("./scripts/seed.js");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const tWidth = 60;
  const tHeight = 60;
  const rows = 10;
  const cols = 10;
  const walkable = [0, 9];
  const holding = ["rock","grunk1","","",""];
  const holding_amount = [5,1,0,0,0];
  


  const char_up_right = new Image(tWidth,tWidth);
  char_up_right.src = "./images/char_up_right.png"
  const char_up_left = new Image(tWidth,tWidth);
  char_up_left.src = "./images/char_up_left.png"
  const char_down_left = new Image(tWidth,tWidth);
  char_down_left.src = "./images/char_down_left.png"
  const char_down_right = new Image(tWidth,tWidth);
  char_down_right.src = "./images/char_down_right.png"
  const char_left = new Image(tWidth,tWidth);
  char_left.src = "./images/char_left.png"
  const char_right = new Image(tWidth,tWidth);
  char_right.src = "./images/char_right.png"
  const char_up = new Image(tWidth,tWidth);
  char_up.src = "./images/char_up.png"
  const char_down = new Image(tWidth,tWidth);
  char_down.src = "./images/char_down.png"
  const wood = new Image(tWidth,tWidth);
  wood.src = "./images/wood.jpg"
  const grass = new Image(tWidth,tWidth);
  grass.src = "./images/grass.png"
  const soil = new Image(tWidth,tWidth);
  soil.src = "./images/soil.png"
  const rock = new Image(tWidth,tWidth);
  rock.src = "./images/rock.jpg"
  const unselected_inv = new Image(tWidth,tWidth);
  unselected_inv.src = "./images/unselected_inv.png"
  const inv_slot = new Image(tWidth,tWidth);
  inv_slot.src = "./images/inv_slot.png"
  const radish_seed = new Image(tWidth,tWidth);
  radish_seed.src = "./images/radish_seed.png"
  const grunk1 = new Image(tWidth,tWidth);
  grunk1.src = "./images/grunk1.png"
  const grunk2 = new Image(tWidth,tWidth);
  grunk2.src = "./images/grunk2.png"
  const grunk3 = new Image(tWidth,tWidth);
  grunk3.src = "./images/grunk3.png"
  const grunk4 = new Image(tWidth,tWidth);
  grunk4.src = "./images/grunk4.png"
  const grunk5 = new Image(tWidth,tWidth);
  grunk5.src = "./images/grunk5.png"
  const grunk6 = new Image(tWidth,tWidth);
  grunk6.src = "./images/grunk6.png"
  const grunk7 = new Image(tWidth,tWidth);
  grunk7.src = "./images/grunk7.png"
  const radish_5 = new Image(tWidth,tWidth);
  radish_5.src = "./images/radish_5.png"
  const num1 = new Image(tWidth,tWidth);
  num1.src = "./images/num1.png"
  const num2 = new Image(tWidth,tWidth);
  num2.src = "./images/num2.png"
  const num3 = new Image(tWidth,tWidth);
  num3.src = "./images/num3.png"
  const num4 = new Image(tWidth,tWidth);
  num4.src = "./images/num4.png"
  const num5 = new Image(tWidth,tWidth);
  num5.src = "./images/num5.png"
  const num6 = new Image(tWidth,tWidth);
  num6.src = "./images/num6.png"
  const num7 = new Image(tWidth,tWidth);
  num7.src = "./images/num7.png"
  const num8 = new Image(tWidth,tWidth);
  num8.src = "./images/num8.png"
  const num9 = new Image(tWidth,tWidth);
  num9.src = "./images/num9.png"
    let facing="down";
    let selected = 0;
    let xpos = 10;
    let ypos = 10;
    let moving_right = false;
    let moving_left = false;
    let moving_down = false;
    let moving_up = false;
    const floor = [
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,9,9,0,
      0,0,0,0,0,0,0,9,9,0,
      0,0,0,0,0,0,0,0,0,0
    ]
  
    const map = [
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0
    ];


    function add_action(e) {
      if (e.keyCode == 68) {
        moving_right = true;
      }
      if (e.keyCode == 65) {
        moving_left = true;
      }
      if (e.keyCode == 87) {
        moving_up = true
      }
      if (e.keyCode == 83) {
        moving_down = true
      }
      if (e.keyCode == 32) {
        e.preventDefault();
        let next_block = nextblockcheck(xpos,ypos);
        let idx = next_block[1] * cols + next_block[0];
        switch(holding[selected]){
          case "":
            if (map[idx] instanceof Seed) {
              if (map[idx].stage === 7) {
                holding[selected] = map[idx].type.concat(map[idx].stage)
                holding_amount[selected] += 1
                map[idx] = 0;
              }
            }
            break;
          case "rock":
            if (floor[idx] === 0) {
              if (holding_amount[selected] >= 1) {
                holding_amount[selected] -= 1;
                if (holding_amount[selected] === 0) {
                  holding[selected] = "";
                }
              }
              map[idx] = 1;
            }
            break;
          case "radish_seed":
            if (floor[idx] === 9) {
              map[idx] = 10;
            }
            break;
          case "grunk1":
            if (floor[idx] === 9) {
              if (holding_amount[selected] >= 1) {
                holding_amount[selected] -= 1;
                if (holding_amount[selected] === 0) {
                  holding[selected] = "";
                }
              } 
              let g = new Seed("grunk");
              map[idx] = g;
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
        moving_right = false;
      }
      if (e.keyCode == 65) {
        moving_left = false;
      }
      if (e.keyCode == 87) {
        moving_up = false;
      }
      if (e.keyCode == 83) {
        moving_down = false;
      }
    }

  

  const updateAll = () => {
    document.onkeydown = add_action;
    document.onkeyup = remove_action;
    move();
    printlayer1();
    printlayer2();
    printchar();
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
    let next_block_idx = nextblock[1] * cols + nextblock[0];
    if (moving_right) {
      facing = "right";
      if (walkable.includes(map[next_block_idx]) && inbounds())
      xpos+=1;
    }
    if (moving_left) {
      facing = "left"
      if (walkable.includes(map[next_block_idx]) && inbounds())
      xpos-=1;
    }
    if (moving_up) {
      facing = "up"
      if (walkable.includes(map[next_block_idx]) && inbounds())
      ypos-=1;
    }
    if (moving_down) {
      facing = "down"
      if (walkable.includes(map[next_block_idx]) && inbounds())
      ypos+=1;
    }
    if (moving_up && moving_left) {
      facing = "up_left"
    }
    if (moving_down && moving_left) {
      facing = "down_left"
    }
    if (moving_up && moving_right) {
      facing = "up_right"
    }
    if (moving_down && moving_right) {
      facing = "down_right"
    }
  }

  const printlayer1 = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let idx = i * cols + j;
        if(floor[idx] === 0) {
          ctx.drawImage(grass, tWidth * j, tHeight * i, tWidth, tWidth);
        }
        if(floor[idx] === 9) {
          ctx.drawImage(soil, tWidth * j, tHeight * i, tWidth, tWidth);
        }
    }
  }
}

  const printlayer2 = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let idx = i * cols + j;
        if(map[idx] === 1) {
          ctx.drawImage(rock, tWidth * j, tHeight * i, tWidth, tWidth);
        } 
        else if(map[idx] === 10) {
          ctx.drawImage(radish_seed, tWidth * j, tHeight * i, tWidth, tWidth);
        } 
        // else if(map[idx] === 11) {
        //   ctx.drawImage(grunk_seed, tWidth * j, tHeight * i, tWidth, tWidth);
        // } 
        if(map[idx] instanceof Seed) {
          ctx.drawImage(eval(map[idx].type.concat(map[idx].stage)), tWidth * j, tHeight * i, tWidth, tWidth);
        }
      }
    }
  }

  const printbar = () => {
    for (i = 0; i < holding.length; i++) {
      if (i === selected) {
        ctx.drawImage(inv_slot, tWidth * i, canvas.width, tWidth,tWidth)
      } else {
        ctx.drawImage(unselected_inv, tWidth * i, canvas.width, tWidth,tWidth)
      }
      if (holding[i] != "") {
        ctx.drawImage(eval(holding[i]), (tWidth * i) + (tWidth * (1/6)), canvas.width + (tWidth * (1/6)), tWidth*(4/6),tWidth*(4/6))
      }
      if (holding_amount[i] > 0) {
        ctx.drawImage(eval(`num${holding_amount[i]}`), (tWidth * i) + (tWidth * (4/6)), canvas.width + (tWidth * (4/6)), tWidth*(2/6),tWidth*(2/6))
      }
    }
  }

  // const checkseeds = () => {
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       let idx = i * cols + j;
  //       if(map[idx] instanceof Seed) {
  //         map[idx] = map[idx]
  //       } 
  //     }
  //   }
  // }

  // const currblock = () => {
  //   let cur_x = Math.floor((xpos+(tWidth/2))/tWidth)
  //   let cur_y = Math.floor((ypos+(tWidth/2))/tWidth)
  //   return [cur_x, cur_y]
  // }

  const nextpix = () => {
    let next_x = xpos
    let next_y = ypos
    switch(facing) {
      case "left":
        next_x -= (tWidth/2) + 1;
        break;
      case "right":
        next_x += (tWidth/2) + 1;
        break;
      case "down":
        next_y += (tWidth/2) + 1;
        break;
      case "up":
        next_y -= (tWidth/2) + 1;
        break;
      case "up_left":
        next_x -= (tWidth/2) + 1;
        next_y -= (tWidth/2) + 1;
        break;
      case "up_right":
        next_x += (tWidth/2) + 1;
        next_y -= (tWidth/2) + 1;
        break;
      case "down_left":
        next_x -= (tWidth/2) + 1;
        next_y += (tWidth/2) + 1;
        break;
      case "down_right":
        next_x += (tWidth/2) + 1;
        next_y += (tWidth/2) + 1;
    }
    return [next_x, next_y]
  }

  const inbounds = () => {
    let next_x = xpos
    let next_y = ypos
    switch(facing) {
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
    return next_x + tWidth <= canvas.width && next_y + tWidth <= 600 && next_x >= 0 && next_y >= 0
  }

  function currentblockcheck(x,y) {
    let block_x = Math.floor((x+(tWidth/2))/tWidth)
    let block_y = Math.floor((y+(tWidth/2))/tWidth)
    return [block_x, block_y]
  }

  function nextblockcheck(x,y) {
    let block_x = Math.floor((x+(tWidth/2))/tWidth)
    let block_y = Math.floor((y+(tWidth/2))/tWidth)
    switch(facing) {
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
      let next_block = nextblockcheck(xpos,ypos);
      if (next_block[0] < 10 && next_block[1] < 10) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(eval(holding[selected]), tWidth * next_block[0], tWidth* next_block[1], tWidth, tWidth);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  const printchar = () => {
    switch(facing) {
      case "left":
        ctx.drawImage(char_left, xpos, ypos, tWidth, tWidth);
        break;
      case "right":
        ctx.drawImage(char_right, xpos, ypos, tWidth, tWidth);
        break;
      case "up":
        ctx.drawImage(char_up, xpos, ypos, tWidth, tWidth);
        break;
      case "down":
        ctx.drawImage(char_down, xpos, ypos, tWidth, tWidth);
        break;
      case "up_left":
        ctx.drawImage(char_up_left, xpos, ypos, tWidth, tWidth);
        break;
      case "up_right":
        ctx.drawImage(char_up_right, xpos, ypos, tWidth, tWidth);
        break;
      case "down_left":
        ctx.drawImage(char_down_left, xpos, ypos, tWidth, tWidth);
        break;
      case "down_right":
        ctx.drawImage(char_down_right, xpos, ypos, tWidth, tWidth);
    }
  }

});
