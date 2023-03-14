class Stove {
    constructor() {
        this.veggie = "";
        this.fish = "";
        this.cooking = false;
        this.veggie_values = {
            "grunk7" : 20,
            "root7": 30
        }

        this.fish_values = {
          "anchovy": 10,
          "sardine": 10,
          "shad": 10,
          "salmon": 15,
          "carp": 15,
          "catfish": 15,
          "tuna": 20,
          "octopus": 20,
          "seacucumber": 20,
          "squid": 20,
          "sturgeon": 25,
          "rainbowtrout": 25,
          "supercucumber": 25,
          "pufferfish": 25,
          "legend": 30,
          "crimsonfish": 30,
          "angler": 30,
        }
    }
    
    additem(char, item, broadcast) {
        if (Object.keys(this.veggie_values).includes(item)) {
            if (this.veggie === "") {
                char.dropitem();
                this.veggie = item;
                this.cooking = true;
                return true;
            } else {
                broadcast(`There is already a ${this.veggie} cooking`)
                return false;
            }
        } else if (Object.keys(this.fish_values).includes(item)) {
            if (this.fish === "") {
                char.dropitem();
                this.fish = item;
                this.cooking = true;
                return true;
            } else {
                broadcast(`There is already a ${this.fish} cooking`)
                return false;
            }
        } else {
            broadcast("Cant cook this item")
            return false;
        }
    }

    eat(char, broadcast) {
        if (this.veggie != "" && this.fish != "") {
            let value = this.fish_values[this.fish] + this.veggie_values[this.veggie]
            broadcast(`Ate a ${this.veggie}/${this.fish} soup for ${value} value`)
            char.eat_something(value);
            this.cooking = false;
            this.veggie = "";
            this.fish = "";
            return true;
        } else {
            broadcast(`Please add ${this.veggie != "" ? "" : "veggie"} ${this.fish != "" ? "" : "fish"}`)
            return false;
        }
    }
}