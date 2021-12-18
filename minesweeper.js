let cols, rows, game
const GRIDSIZE = 400
const CELLSIZE = 40
const BOMBS = 10
let IMAGEHANDLER

function mousePressed() {
  game.mouseHandler(mouseX, mouseY)
}

function setup (){
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  createCanvas (GRIDSIZE, GRIDSIZE)

  cols = width/CELLSIZE
  rows = height/CELLSIZE


  const questionMark = loadImage('img/question-mark.png')
  const bomb = loadImage('img/bomb.png')
  const flag = loadImage('img/flag.png')
  IMAGEHANDLER = new ImageHandler(questionMark, bomb, flag)

  game = new Game(cols, rows, BOMBS)
}

function draw(){
  background(255);

  game.show()
}
