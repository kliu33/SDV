class Map {
    constructor() {
        this.walkable = [0, 4, 5, 9,27,56,57];
        this.mineable = [50,51,52,53,54,55,56,57];
        this.placeable = [0, 4, 5, 1, 50];
        this.pixel_size = 60;
        this.rows = 10;
        this.cols = 10;
        this.hours = 7;
        this.minutes = 0;
        this.fun_facts = ["The first computer “bug” was an actual real-life bug",
        "The name Oak was intended to be used for the popular Java that we commonly use now, but it was already used and copyrighted",
        "NASA’s reusable space shuttle in the 1970s had less code than our phones today.",
        "Contrary to how it sounds like, Python was named after Monty Python, not after the snake.",
        "There are around 700 different programming languages, with more on the way.",
        "The first-ever computer programmer was a woman named Ada Lovelace.",
        "Creeper System was the first computer virus that was released in 1971.",
        "Computer codes had an important role in ending WWII.",
        "The first programming language in the world was called FORTRAN."
        ]
        this.dict = {
          "rock": 50,
          "grass": 0,
          "wood": 1,
          "black": -1,
          "pickaxe": 101,
          "shelf": 51,
          "bed": 52,
          "closet": 53,
          "table": 54,
          "cactus": 55,
          "roses": 56,
          "violets": 57
        }
        this.floor = [
            0,0,0,0,0,0,0,0,0,0,
            0,9,9,9,0,0,0,0,0,0,
            0,9,9,9,0,0,0,0,0,0,
            0,9,9,9,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            4,4,4,4,4,4,4,4,4,4,
            5,5,5,5,5,5,5,5,5,5,
            6,6,6,6,6,6,6,6,6,6
          ];
        this.house_floor = [
            -1,-1,-1,-1,-1,1,1,1,1,1,
            -1,-1,-1,-1,-1,1,1,1,1,1,
            -1,-1,-1,-1,-1,1,1,1,1,1,
            -1,-1,-1,-1,-1,1,1,1,1,1,
            -1,-1,-1,-1,-1,1,1,1,1,1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
          ];
        this.map = [
            0,0,0,0,0,5,6,7,8,9,
            0,0,0,0,0,10,11,12,13,14,
            0,0,0,0,0,15,16,17,18,19,
            0,0,0,0,0,20,21,22,23,24,
            0,0,0,0,0,25,26,27,28,29,
            0,0,0,0,0,0,0,0,0,30,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0
          ];
        this.house_map = [
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0
          ];
        setInterval(this.time.bind(this), 1000);
    }

    time() {
      this.minutes += 1;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours += 1;
      }
      if (this.hours >= 24) {
        this.hours = 0;
      }
    }
}