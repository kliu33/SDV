class Bucket {
    constructor () {
        this.level = 100;
    }

    fill() {
        this.level = 100;
    }

    use() {
        if (this.level >= 10) {
            this.level -= 10;
        } else {
            alert("Bucket is empty")
        }
    }
}