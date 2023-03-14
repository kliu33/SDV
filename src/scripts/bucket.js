class Bucket {
    constructor () {
        this.power = 10;
        this.size = 100;
        this.level = 100;
    }

    fill() {
        this.level = 100;
    }

    use() {
        if (this.level >= 10) {
            this.level -= 10;
            return true;
        } else {
            return false;
        }
    }
}