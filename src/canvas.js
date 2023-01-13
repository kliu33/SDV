document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  const tWidth = 40;
  const tHeight = 40;

  const rows = 15;
  const cols = 20;


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
  grass.src = "./images/grass.jpg"
  const rock = new Image(40,40);
  rock.src = "./images/rock.jpg"
  const grass_water = new Image(40,40);
  grass_water.src = "./images/grass_water.jpg"
    let facing="down";
    let xpos = 10;
    let ypos = 10;
    function move(e) {
      if (e.keyCode == 39) {
        xpos+=4;
        facing = "right"
      }
      if (e.keyCode == 37) {
        xpos-=4;
        facing = "left"
      }
      if (e.keyCode == 38) {
        ypos-=4;
        facing = "up"
      }
      if (e.keyCode == 40) {
        ypos+=4;
        facing = "down"
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
    document.onkeydown = move;
    printmap();
    printchar();
    window.requestAnimationFrame(updateAll);
  };

  window.onload = () => {
    window.requestAnimationFrame(updateAll);
  };

 

  const printmap = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let idx = i * cols + j;
        if(map[idx] === 1) {
          ctx.drawImage(rock, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 0) {
            ctx.drawImage(grass, tWidth * j, tHeight * i, 40, 40);
          // ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 2) {
          ctx.drawImage(water, tWidth * j, tHeight * i, 40, 40);
          // ctx.fillStyle = "blue"
          // ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 3) {
          ctx.drawImage(brick, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 4) {
          ctx.fillStyle = "black"
          ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 5) {
          ctx.drawImage(grass_water, tWidth * j, tHeight * i, 40, 40);
        } else if (map[idx] === 6) {
          ctx.drawImage(wood, tWidth * j, tHeight * i, 40, 40);
        }else if (map[idx] === 10) {
          switch(facing) {
            case "left":
              ctx.drawImage(char_left, tWidth * j, tHeight * i, 40, 40);
              break;
            case "right":
              ctx.drawImage(char_right, tWidth * j, tHeight * i, 40, 40);
              break;
            case "up":
              ctx.drawImage(char_up, tWidth * j, tHeight * i, 40, 40);
              break;
            case "down":
              ctx.drawImage(char_down, tWidth * j, tHeight * i, 40, 40);
          }
        } 
      }
    }
  }
  const printchar = () => {
    // ctx.clearRect(0, 0, canvas2.width, canvas2.height);
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
    }
  }

});
