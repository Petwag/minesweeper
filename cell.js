class Cell {
    constructor(i, j) {
        this.bomb = false; // is this cell a bomb?

        this.i = i
        this.j = j

        this.x = i*CELLSIZE
        this.y = j*CELLSIZE
        this.w = CELLSIZE

        this.neighbor = 0

        this.state = States.HIDDEN
    
    }

    show() {
        // Display cell
        stroke(0)
        switch (this.state) {
            case States.HIDDEN:
                fill(255)
                rect(this.x, this.y, this.w, this.w)  
                break
            case States.REVEALED:
                if (this.bomb === true) {
                    fill(0)
                    rect(this.x, this.y, this.w, this.w)  
                    textAlign(CENTER)
                    fill(255)
                    image(IMAGEHANDLER.bomb, this.x+5, this.y+5, this.w-10, this.w-10)
                } else {
                    fill(255)
                    rect(this.x, this.y, this.w, this.w)  
                    textAlign(CENTER)
                    fill(0)
                    text(`${this.neighbor}`, this.x+this.w*0.5, this.y+this.w*0.5)
                }
                break
            case States.MARKEDUNKNOWN:
                fill(255)
                rect(this.x, this.y, this.w, this.w)  
                image(IMAGEHANDLER.questionMark, this.x+5, this.y+5, this.w-10, this.w-10)
                break
            case States.MARKEDBOMB:
                fill(255)
                rect(this.x, this.y, this.w, this.w)  
                image(IMAGEHANDLER.flag, this.x+5, this.y+5, this.w-10, this.w-10)
                break
            default:
                break

        }
    }

    contains(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }

    reveal() {
        console.log("paf");
        this.state = States.REVEALED
    }

    mark() {
        switch(this.state) {
            case States.HIDDEN:
                this.state = States.MARKEDUNKNOWN
                break
            case States.MARKEDUNKNOWN:
                this.state = States.MARKEDBOMB
                break
            case States.MARKEDBOMB:
                this.state = States.HIDDEN
                break
            default:
                break
        }
    }
}

const States = {
    HIDDEN:"hidden",
    MARKEDBOMB:"markedbomb",
    MARKEDUNKNOWN:"markedunknown",
    REVEALED:"revealed"
}