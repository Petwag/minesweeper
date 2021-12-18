class Game {
    constructor(cols, rows, bombs) {

        this.cols = cols
        this.rows = rows

        this.bombs = bombs

        this.grid = []

        this.initGrid()
    }

    initGrid() {
        // Create grid
        for (let i = 0; i < this.cols; i++) {
            let column = []
            for (let j = 0; j < rows; j++) {
            column.push(new Cell(i, j))
            }
            this.grid.push(column)
        }

        // Set bombs
        let bombsSet = new Set()

        for (let b = 0; b < this.bombs; b++) {
            let index_x = floor(random(this.cols))
            let index_y = floor(random(this.rows))
        
            while (bombsSet.has(`${index_x}-${index_y}`)) {
            index_x = floor(random(this.cols))
            index_y = floor(random(this.rows))
            }

            this.grid[index_x][index_y].bomb = true
            bombsSet.add(`${index_x}-${index_y}`)
        }

        // Set neighbors count
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const cell = this.grid[x][y]
                if (cell.bomb === true) {
                    cell.neighbor = -1
                }
                else {
                    let total = 0
                    for (let xoffset = -1; xoffset <= 1; xoffset++) {
                        let i = cell.i + xoffset
                        if (i < 0 || i >= this.cols) continue
            
                        for (let yoffset = -1; yoffset <= 1; yoffset++) {
                            let j = cell.j + yoffset
                            if (j < 0 || j >= this.rows) continue
            
                            let neighbor = this.grid[i][j]
                            if (neighbor.bomb === true) {
                                total++
                            }
                        }
                    }
                    cell.neighbor = total
                }
            }
        }
    }

    show() {
        // Display game
        this.grid.forEach(col => {
            col.forEach(cell => {
                // Display each cell
                cell.show()
            })
        })
    }

    mouseHandler(mouseX, mouseY) {
        console.log("click");
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.grid[i][j]
                if (cell.contains(mouseX, mouseY) === true) {
                    if(mouseButton === RIGHT) {
                        cell.mark()
                    }
                    else if(mouseButton === LEFT) {
                        if (cell.bomb === true) {
                            this.gameOver();
                        }
                        else {
                            this.reveal(cell)         
                        }
                    }
                    
                }
            }
          }
    }

    reveal(cell) {
        if (cell.state === States.REVEALED) {
            return
        }

        cell.reveal()

        if (cell.neighbor === 0) {
            // If the neigborhood doesn't contains bomb then we floodfill the surrounding area
            for (let xoffset = -1; xoffset <= 1; xoffset++) {
                let i = cell.i + xoffset
                if (i < 0 || i >= this.cols) continue
    
                for (let yoffset = -1; yoffset <= 1; yoffset++) {
                    let j = cell.j + yoffset
                    if (j < 0 || j >= this.rows) continue
    
                    this.reveal(this.grid[i][j])
                }
            }
        }
    }

    gameOver() {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
            this.grid[i][j].reveal();
            }
        }
    }
}