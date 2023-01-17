class FishingRod {
    constructor() {
        this.durability = 100;
        this.trash = ["searock", "clam", "kelp", "log"]
        this.fishes1 = ["anchovy", "sardine", "shad"]
        this.fishes2 = ["salmon", "carp", "catfish"]
        this.fishes3 = ["tuna", "octopus", "seacucumber", "squid"]
        this.fishes4 = ["sturgeon", "rainbowtrout", "supercucumber", "pufferfish"]
        this.fishes5 = ["legend", "crimsonfish", "angler"]
    }   

    repair() {
        this.durability = 100;
    }

    use(char) {
        if (this.durability >= 10) {
            if (char.holding.includes("")){ 
                this.durability -= 10;
                let roll = Math.floor(Math.random() * 101);
                if (roll < 30) {
                    let caught = this.trash[Math.floor(Math.random()*this.trash.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                } else if (roll < 50) {
                    let caught = this.fishes1[Math.floor(Math.random()*this.fishes1.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                } else if (roll < 70) {
                    let caught = this.fishes2[Math.floor(Math.random()*this.fishes2.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                } else if (roll < 90) {
                    let caught = this.fishes3[Math.floor(Math.random()*this.fishes3.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                } else if (roll < 99) {
                    let caught = this.fishes4[Math.floor(Math.random()*this.fishes4.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                } else {
                    let caught = this.fishes5[Math.floor(Math.random()*this.fishes5.length)]
                    alert(`You rolled a ${roll}, and you caught a ${caught}!`)
                    char.additem(caught)
                }
            } 
        }else {
            alert("Fishing Rod is broken")
        }
    }
}