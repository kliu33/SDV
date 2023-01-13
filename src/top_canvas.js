document.addEventListener("DOMContentLoaded", function () {
    const canvas2 = document.getElementById("top-canvas");
    canvas2.width = 800;
    canvas2.height = 600;
    const ctx2 = canvas2.getContext("2d");
    xpos = 50
    ypos = 50
    let facing = "down";
    

  const char_left = new Image(40,40);
  char_left.src = "./images/char_left.jpg"
  const char_right = new Image(40,40);
  char_right.src = "./images/char_right.jpg"
  const char_up = new Image(40,40);
  char_up.src = "./images/char_up.jpg"
  const char_down = new Image(40,40);
  char_down.src = "./images/char_down.jpg"
  
      function move(e) {
          if (e.keyCode == 39) {
            xpos+=2;
            facing = "right"
          }
          if (e.keyCode == 37) {
            xpos-=2;
            facing = "left"
          }
          if (e.keyCode == 38) {
            ypos-=2;
            facing = "up"
          }
          if (e.keyCode == 40) {
            ypos+=2;
            facing = "down"
          }
        }
        
    const updateAll = () => {
      document.onkeydown = move;
      print();
      window.requestAnimationFrame(updateAll);
    };
  
    window.onload = () => {
      window.requestAnimationFrame(updateAll);
    };
  
   
  
    const print = () => {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      switch(facing) {
        case "left":
          ctx2.drawImage(char_left, xpos, ypos, 40, 40);
          break;
        case "right":
          ctx2.drawImage(char_right, xpos, ypos, 40, 40);
          break;
        case "up":
          ctx2.drawImage(char_up, xpos, ypos, 40, 40);
          break;
        case "down":
          ctx2.drawImage(char_down, xpos, ypos, 40, 40);
      }
    }
  
  });
  