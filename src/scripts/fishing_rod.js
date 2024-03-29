class FishingRod {
    constructor() {
        this.durability = 100;
        this.trash = ["searock", "clam", "kelp", "log"]
        this.fishes1 = ["anchovy", "sardine", "shad"]
        this.fishes2 = ["salmon", "carp", "catfish"]
        this.fishes3 = ["tuna", "octopus", "seacucumber", "squid"]
        this.fishes4 = ["sturgeon", "rainbowtrout", "supercucumber", "pufferfish"]
        this.fishes5 = ["legend", "crimsonfish", "angler"]
        this.cooldown = 0;
    }   

    repair(amt) {
        if (this.durability + amt < 100) {
            this.durability += amt;
        } else {
            this.durability = 100;
        }
    }

    
    cool_down() {
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
    }

    start_cd() {
        this.cooldown = 20;
        setInterval(this.cool_down.bind(this), 1000)
    }

    use(char, broadcast) {
        if (this.durability >= 10) {
            if (this.cooldown === 0) {
                if (char.holding.includes("")){ 
                    this.durability -= 10;
                    let roll = Math.floor(Math.random() * 101);
                    let caught;
                    if (roll < 30) {
                        caught = this.trash[Math.floor(Math.random()*this.trash.length)]
                    } else if (roll < 50) {
                        caught = this.fishes1[Math.floor(Math.random()*this.fishes1.length)]
                    } else if (roll < 70) {
                        caught = this.fishes2[Math.floor(Math.random()*this.fishes2.length)]
                    } else if (roll < 90) {
                        caught = this.fishes3[Math.floor(Math.random()*this.fishes3.length)]
                    } else if (roll < 99) {
                        caught = this.fishes4[Math.floor(Math.random()*this.fishes4.length)]
                    } else {
                        caught = this.fishes5[Math.floor(Math.random()*this.fishes5.length)]
                    }

                    broadcast(`(${roll}), you caught a ${caught}!`)
                    this.start_cd();
                    char.additem(caught)
                } else {
                    broadcast("Inventory is full.")
                }
            } else {
                broadcast(`You must wait ${this.cooldown} seconds before fishing again.`)
            }
        }else {
            broadcast("Fishing Rod is broken.")
        }
    }
}