
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const tWidth = 40;
  const tHeight = 40;
  const rows = 15;
  const cols = 20;
  


  let actions = [];
  const char_up_right = new Image(40,40);
  char_up_right.src = "./images/char_up_right.png"
  const char_up_left = new Image(40,40);
  char_up_left.src = "./images/char_up_left.png"
  const char_down_left = new Image(40,40);
  char_down_left.src = "./images/char_down_left.png"
  const char_down_right = new Image(40,40);
  char_down_right.src = "./images/char_down_right.png"

  const char_left = new Image(40,40);
  char_left.src = "./images/char_left.png"
  const char_right = new Image(40,40);
  char_right.src = "./images/char_right.png"
  const char_up = new Image(40,40);
  char_up.src = "./images/char_up.png"
  const char_down = new Image(40,40);
  char_down.src = "./images/char_down.png"
  const wood = new Image(40,40);
  wood.src = "./images/wood.jpg"
  const water = new Image(40,40);
  water.src = "./images/water.jpg"
  const brick = new Image(40,40);
  brick.src = "./images/brick.jpg"
  const grass = new Image(40,40);
  grass.src = "./images/grass.png"
  const rock = new Image(40,40);
  rock.src = "./images/rock.jpg"
  const grass_water = new Image(40,40);
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

  const map = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    
  ];

  const updateAll = () => {
    document.onkeydown = add_action;
    document.onkeyup = remove_action;
    action();
    printmap();
    printchar();
    printblock();
    window.requestAnimationFrame(updateAll);
  };

  window.onload = () => {
    window.requestAnimationFrame(updateAll);
  };

  const action = () => {
    if (actions.includes("right")) {
      xpos+=1;
      facing = "right";
    }
    if (actions.includes("left")) {
      xpos-=1;
      facing = "left"
    }
    if (actions.includes("up")) {
      ypos-=1;
      facing = "up"
    }
    if (actions.includes("down")) {
      ypos+=1;
      facing = "down"
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

  const printmap = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let idx = i * cols + j;
        if(map[idx] === 1) {
          ctx.drawImage(rock, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 0) {
            ctx.drawImage(grass, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 2) {
          ctx.drawImage(water, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 3) {
          ctx.drawImage(brick, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 4) {
          ctx.fillStyle = "black"
          ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 5) {
          ctx.drawImage(grass_water, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 6) {
          ctx.drawImage(wood, tWidth * j, tHeight * i, 40, 40);
        }
      }
    }
  }

  const printblock = () => {
    let cur_x = Math.floor((xpos+20)/40)
    let cur_y = Math.floor((ypos+20)/40)
    ctx.fillStyle = 'rgba(225,225,225,0.2)';
    ctx.fillRect(tWidth * cur_x, tHeight * cur_y, 40,40);
  }

  const printchar = () => {
    switch(facing) {
      case "left":
        ctx.drawImage(char_left, xpos, ypos, 40, 40);
        break;
      case "right":
        ctx.drawImage(char_right, xpos, ypos, 40, 40);
        break;
      case "up":
        ctx.drawImage(char_up, xpos, ypos, 40, 40);
        break;
      case "down":
        ctx.drawImage(char_down, xpos, ypos, 40, 40);
        break;
      case "up_left":
        ctx.drawImage(char_up_left, xpos, ypos, 40, 40);
        break;
      case "up_right":
        ctx.drawImage(char_up_right, xpos, ypos, 40, 40);
        break;
      case "down_left":
        ctx.drawImage(char_down_left, xpos, ypos, 40, 40);
        break;
      case "down_right":
        ctx.drawImage(char_down_right, xpos, ypos, 40, 40);
        break;
    }
  }

});
