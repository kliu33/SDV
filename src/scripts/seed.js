class Seed {
    constructor(type) {
        this.type = type;
        this.stage = 1;
        this.water_level = 100;
        this.life = true;
        setInterval(this.growUp.bind(this), 10000);
        setInterval(this.wither.bind(this), 5000);
    }

    growUp() {
        if (this.stage < 7 && this.water_level > 40 && this.life) {
            this.stage += 1;
        }
    }

    water() {
        if (this.water_level <= 90 ) {
            this.water_level += 10;
        }
    }

    wither() {
        if (this.life) {
            this.water_level -= 1;
            if (this.water_level <= 0){
                this.life = false;
            }
        }
    }
}