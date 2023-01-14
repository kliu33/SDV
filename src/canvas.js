
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const tWidth = 60;
  const tHeight = 60;
  const rows = 10;
  const cols = 10;
  const walkable = [0]
  


  let actions = [];
  const char_up_right = new Image(tWidth,tWidth);
  char_up_right.src = "./images/char_up_right.png"
  const char_up_left = new Image(tWidth,tWidth);
  char_up_left.src = "./images/char_up_left.png"
  const char_down_left = new Image(tWidth,tWidth);
  char_down_left.src = "./images/char_down_left.png"
  const char_down_right = new Image(tWidth,tWidth);
  char_down_right.src = "./images/char_down_right.png"
  const pond_down_right = new Image(tWidth,tWidth);
  pond_down_right.src = "./images/pond_down_right.png"
  const pond_down_left = new Image(tWidth,tWidth);
  pond_down_left.src = "./images/pond_down_left.png"
  const pond_up_left = new Image(tWidth,tWidth);
  pond_up_left.src = "./images/pond_up_left.png"
  const pond_up_right = new Image(tWidth,tWidth);
  pond_up_right.src = "./images/pond_up_right.png"

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
  const water = new Image(tWidth,tWidth);
  water.src = "./images/water.jpg"
  const brick = new Image(tWidth,tWidth);
  brick.src = "./images/brick.jpg"
  const grass = new Image(tWidth,tWidth);
  grass.src = "./images/grass.png"
  const rock = new Image(tWidth,tWidth);
  rock.src = "./images/rock.jpg"
  const grass_water = new Image(tWidth,tWidth);
  grass_water.src = "./images/grass_water.jpg"
    let facing="down";
    let xpos = 10;
    let ypos = 10;
    function add_action(e) {
      if (e.keyCode == 68) {
        if (!actions.includes("right")){
          actions.push("right")
        }
      }
      if (e.keyCode == 65) {
        if (!actions.includes("left")){
          actions.push("left")
        }
      }
      if (e.keyCode == 87) {
        if (!actions.includes("up")){
          actions.push("up")
        }
      }
      if (e.keyCode == 83) {
        if (!actions.includes("down")){
          actions.push("down")
        }
      }
    }

    function remove_action(e) {
      if (e.keyCode == 68) {
        actions.splice(actions.indexOf("right"))
      }
      if (e.keyCode == 65) {
        actions.splice(actions.indexOf("left"))
      }
      if (e.keyCode == 87) {
        actions.splice(actions.indexOf("up"))
      }
      if (e.keyCode == 83) {
        actions.splice(actions.indexOf("down"))
      }
    }



  const floor = [
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
  ]

  const map = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,0,0,0,
    0,0,0,0,0,1,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ];

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
    let nextblock = blockcheck(nextpix()[0], nextpix()[1])
    let next_block_idx = nextblock[1] * cols + nextblock[0];
    if (actions.includes("right")) {
      facing = "right";
      if (walkable.includes(map[next_block_idx]))
      xpos+=1;
    }
    if (actions.includes("left")) {
      facing = "left"
      if (walkable.includes(map[next_block_idx]))
      xpos-=1;
    }
    if (actions.includes("up")) {
      facing = "up"
      if (walkable.includes(map[next_block_idx]))
      ypos-=1;
    }
    if (actions.includes("down")) {
      facing = "down"
      if (walkable.includes(map[next_block_idx]))
      ypos+=1;
    }
    if (actions.includes("up") && actions.includes("left")) {
      facing = "up_left"
    }
    if (actions.includes("down") && actions.includes("left")) {
      facing = "down_left"
    }
    if (actions.includes("up") && actions.includes("right")) {
      facing = "up_right"
    }
    if (actions.includes("down") && actions.includes("right")) {
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
        // else if (map[idx] === 0) {
        //     ctx.drawImage(grass, tWidth * j, tHeight * i, tWidth, tWidth);
        // } else if (map[idx] === 2) {
        //   ctx.drawImage(water, tWidth * j, tHeight * i, tWidth, tWidth);
        // } else if (map[idx] === 3) {
        //   ctx.drawImage(brick, tWidth * j, tHeight * i, tWidth, tWidth);
        // }  else if (map[idx] === 5) {
        //   ctx.drawImage(grass_water, tWidth * j, tHeight * i, tWidth, tWidth);
        // } else if (map[idx] === 6) {
        //   ctx.drawImage(wood, tWidth * j, tHeight * i, tWidth, tWidth);
        // }else if (map[idx] === 11) {
        //   ctx.drawImage(pond_up_left, tWidth * j, tHeight * i, tWidth, tWidth);
        // }else if (map[idx] === 12) {
        //   ctx.drawImage(pond_up_right, tWidth * j, tHeight * i, tWidth, tWidth);
        // }else if (map[idx] === 13) {
        //   ctx.drawImage(pond_down_right, tWidth * j, tHeight * i, tWidth, tWidth);
        // }else if (map[idx] === 14) {
        //   ctx.drawImage(pond_down_left, tWidth * j, tHeight * i, tWidth, tWidth);
        // }
      }
    }
  }

  const printbar = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 600, tWidth, tWidth)
  }

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
    return [next_x, next_y]
  }

  function blockcheck(x,y) {
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
    let next_block = nextblockcheck(xpos,ypos);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(rock, tWidth * next_block[0], tWidth* next_block[1], tWidth, tWidth);
    ctx.globalAlpha = 1.0;
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
