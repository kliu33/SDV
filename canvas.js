document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  const tWidth = 20;
  const tHeight = 20;

  const rows = 30;
  const cols = 40;


  const char_left = new Image(20,20);
  char_left.src = "./images/char_left.jpg"
  const char_right = new Image(20,20);
  char_right.src = "./images/char_right.jpg"
  const char_up = new Image(20,20);
  char_up.src = "./images/char_up.jpg"
  const char_down = new Image(20,20);
  char_down.src = "./images/char_down.jpg"
  const wood = new Image(20,20);
  wood.src = "./images/wood.jpg"
  const water = new Image(20,20);
  water.src = "./images/water.jpg"
  const brick = new Image(20,20);
  brick.src = "./images/brick.jpg"
  const grass = new Image(20,20);
  grass.src = "./images/grass.jpg"
  const rock = new Image(20,20);
  rock.src = "./images/rock.jpg"
  const grass_water = new Image(20,20);
  grass_water.src = "./images/grass_water.jpg"

    const walkable = [0, 4, 6]
    const in_house = [551, 550, 549, 548, 553, 554, 555, 556,512,511,510,509,508,513,514,515,516,469,470,471,472,473,474,475,
    430,431,432,433,434,391,392,393,352]
    let facing="down";
    var xpos = 10;
    var ypos = 10;
    let temp;
    let temp_val=0;
    function move(e) {
        temp = ypos * cols + xpos
        if (e.keyCode == 39 && walkable.includes(map[(ypos*cols + (xpos+1))])) {
          map[temp] = temp_val
          xpos+=1;
          temp_val = map[ypos * cols + xpos]
          facing = "right"
        }
        if (e.keyCode == 37  && walkable.includes(map[(ypos*cols + (xpos-1))])) {
          
          map[temp] = temp_val
          xpos-=1;
          temp_val = map[ypos * cols + xpos]
          facing = "left"
        }
        if (e.keyCode == 38  && walkable.includes(map[((ypos-1)*cols + xpos)])) {
          if (temp === 632) {
            in_house.forEach(ele => map[ele] = 6)
            map[temp] = temp_val
            ypos-=1;
            temp_val = map[ypos * cols + xpos]
          } else {
          map[temp] = temp_val
          ypos-=1;
          temp_val = map[ypos * cols + xpos]
          }
          facing = "up"
        }
        if (e.keyCode == 40  && walkable.includes(map[((ypos+1)*cols + xpos)])) {
          if (temp === 592) {
            in_house.forEach(ele => map[ele] = 3)
            map[temp] = temp_val
            ypos+=1;
            temp_val = map[ypos * cols + xpos]
          } else {
          map[temp] = temp_val
          ypos+=1;
          temp_val = map[ypos * cols + xpos]
          }
          facing = "down"
        }
        if (e.keyCode == 32) {
          switch(facing) {
            case "left":
              if (map[ypos * cols + (xpos-1)] === 0) {
                map[ypos * cols + (xpos-1)] = 1;
              }
              break;
            case "right":
              if (map[ypos * cols + (xpos+1)] === 0) {
                map[ypos * cols + (xpos+1)] = 1;
              }
              break;
            case "up":
              if (map[(ypos-1) * cols + xpos] === 0) {
                map[(ypos-1) * cols + xpos] = 1;
              }
              break;
            case "down":
              if (map[(ypos+1) * cols + xpos] === 0) {
                map[(ypos+1) * cols + xpos] = 1;
              }
          }
        }
        if (e.keyCode == 8) {
          switch(facing) {
            case "left":
                map[ypos * cols + (xpos-1)] = 0;
              break;
            case "right":
                map[ypos * cols + (xpos+1)] = 0;
              break;
            case "up":
                map[(ypos-1) * cols + xpos] = 0;
              break;
            case "down":
                map[(ypos+1) * cols + xpos] = 0;
          }
        }
        
      }
        

  const map = [
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 2, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
  ];

  const updateAll = () => {
    document.onkeydown = move;
    print();
    window.requestAnimationFrame(updateAll);
  };

  window.onload = () => {
    document.onkeydown = move;
    window.requestAnimationFrame(updateAll);
  };

 

  const print = () => {
    map[ypos * cols + xpos] = 10
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let idx = i * cols + j;
        if(map[idx] === 1) {
          ctx.drawImage(rock, tWidth * j, tHeight * i, 20, 20);
        } else if (map[idx] === 0) {
            ctx.drawImage(grass, tWidth * j, tHeight * i, 20, 20);
          // ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 2) {
          ctx.drawImage(water, tWidth * j, tHeight * i, 20, 20);
          // ctx.fillStyle = "blue"
          // ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 3) {
          ctx.drawImage(brick, tWidth * j, tHeight * i, 20, 20);
        } else if (map[idx] === 4) {
          ctx.fillStyle = "black"
          ctx.fillRect(tWidth * j, tHeight * i, tWidth, tHeight)
        } else if (map[idx] === 5) {
          ctx.drawImage(grass_water, tWidth * j, tHeight * i, 20, 20);
        } else if (map[idx] === 6) {
          ctx.drawImage(wood, tWidth * j, tHeight * i, 20, 20);
        }else if (map[idx] === 10) {
          switch(facing) {
            case "left":
              ctx.drawImage(char_left, tWidth * j, tHeight * i, 20, 20);
              break;
            case "right":
              ctx.drawImage(char_right, tWidth * j, tHeight * i, 20, 20);
              break;
            case "up":
              ctx.drawImage(char_up, tWidth * j, tHeight * i, 20, 20);
              break;
            case "down":
              ctx.drawImage(char_down, tWidth * j, tHeight * i, 20, 20);
          }
        } 
      }
    }
  }

});
