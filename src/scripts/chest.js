class Chest {
    constructor() {
        this.contents = ["","","","","","","","","","","",""]
        this.contents_amount = [0,0,0,0,0,0,0,0,0,0,0,0]
        this.access = false;
        this.selection = 0;
    }

    openchest(char, ctx){
        ctx.drawImage(chest_backdrop, 0, 0, 600,600)
        for (let i = 0; i < this.contents.length; i++){
            if (this.contents[i] != "") {
                ctx.drawImage(eval(this.contents[i]), i <= 5 ? (tWidth*(i*1.03)+(2.7*tWidth)): (tWidth*((i*1.03)-(7.2))+(3.7*tWidth)), i <= 5 ? tWidth * (3) : tWidth * (4), tWidth/2,tWidth/2)
            }
            if (i === this.selection) {
                ctx.drawImage(inv_slot, i <= 5 ? (tWidth*(i*1.03)+(2.7*tWidth)): (tWidth*((i*1.03)-(7.2))+(3.7*tWidth)), i <= 5 ? tWidth * 3 : tWidth * 4, tWidth/2,tWidth/2)
            }
            if (this.contents_amount[i] > 1) {
                ctx.drawImage(eval(`num${this.contents_amount[i]}`), i <= 5 ? (tWidth*(i*1.03)+(3.2*tWidth)): (tWidth*((i*1.03)-(7.2))+(4.2*tWidth)), i <= 5 ? tWidth * (3.5) : tWidth * (4.5), tWidth/4,tWidth/4)
            }
          }
    }

    additem(char, item){
        if (this.contents.includes(item)) {
            if (this.contents_amount[this.contents.indexOf(item)] < 9) {
                char.dropitem()
                this.contents_amount[this.contents.indexOf(item)] += 1
                return true
            } 
        } else if (this.contents.includes("")) {
            let index10 = this.contents.indexOf("")
            this.contents[index10] = item;
            char.dropitem()
            this.contents_amount[index10] += 1;
            return true
        } else {
        alert("Chest is full")
        return false
        }
    }


    takeitem(char){
        if (this.contents[this.selection] != "") {
            char.additem(this.contents[this.selection])
            this.contents_amount[this.selection] -= 1;
            if (this.contents_amount[this.selection] === 0) {
                this.contents[this.selection] = ""
            }
        }
    }
}