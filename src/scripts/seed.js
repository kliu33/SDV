class Seed {
    constructor(type) {
        this.type = type;
        this.stage = 1;
        setInterval(this.growUp.bind(this), 10000);
    }

    growUp() {
        if (this.stage < 7) {
            this.stage += 1;
        }
    }

    
}
