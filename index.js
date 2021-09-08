// import { valid } from "./sudoku.js";

const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;

const initial_board = [
  [0, 0, 0, 3, 9, 0, 0, 0, 0],
  [0, 5, 0, 6, 0, 0, 0, 0, 9],
  [0, 4, 0, 0, 0, 2, 0, 6, 0],
  [0, 0, 7, 0, 0, 5, 0, 1, 0],
  [0, 0, 3, 0, 0, 0, 0, 9, 0],
  [0, 0, 8, 0, 7, 3, 0, 0, 2],
  [0, 0, 5, 0, 0, 6, 8, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 7, 0, 2, 0],
];

function fill_number(x, y, num) {
  const image = new Image(TILE_WIDTH, TILE_HEIGHT);
  image.onload = drawImageActualSize;
  switch (num) {
    case 1:
      image.src = "./nums_image/one.png";
      break;
    case 2:
      image.src = "./nums_image/two.png";
      break;
    case 3:
      image.src = "./nums_image/three.png";
      break;
    case 4:
      image.src = "./nums_image/four.png";
      break;
    case 5:
      image.src = "./nums_image/five.png";
      break;
    case 6:
      image.src = "./nums_image/six.png";
      break;
    case 7:
      image.src = "./nums_image/seven.png";
      break;
    case 8:
      image.src = "./nums_image/eight.png";
      break;
    case 9:
      image.src = "./nums_image/nine.png";
      break;
    default:
      image.src = "./nums_image/none.png";
      break;
  }
  function drawImageActualSize() {
    c.drawImage(this, x + 4, y + 4, 30, 29);
  }
}

class Tile {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
  }
  draw() {
    c.lineWidth = 0.5;
    c.strokeStyle = "#808080";
    c.strokeRect(this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    fill_number(this.x, this.y, this.num);
  }
  update(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
  }
}

function draw_block(x, y, type) {
  c.lineWidth = 2;
  // draw horizontal line
  if (type == "horizontal") {
    c.strokeStyle = "red";
    c.moveTo(x, y);
    c.lineTo(x + TILE_WIDTH, y);
    c.stroke();
  }
  // vertical line
  else {
    c.strokeStyle = "red";
    c.moveTo(x, y);
    c.lineTo(x, y + TILE_HEIGHT);
    c.stroke();
  }
}

class Board {
  constructor(x, y, init_board) {
    this.x = x;
    this.y = y;
    this.init_board = init_board;
  }
  draw() {
    for (let i = 0; i < this.init_board.length; i++) {
      let innerLength = this.init_board[i].length;

      for (let j = 0; j < innerLength; j++) {
        let tile = new Tile(
          this.x + TILE_WIDTH * j,
          this.y + TILE_HEIGHT * i,
          this.init_board[i][j]
        );
        tile.draw();
        if (j % 3 == 0 && j != 0) {
          draw_block(
            this.x + TILE_HEIGHT * j,
            this.y + TILE_WIDTH * i,
            "vertical"
          );
        }
        if (i % 3 == 0 && i != 0) {
          draw_block(
            this.x + TILE_WIDTH * j,
            this.y + TILE_HEIGHT * i,
            "horizontal"
          );
        }
      }
    }
  }

  valid(num, pos) {
    console.log("haa");
    //check row
    for (let i = 0; i < 9; i++) {
      if ((this.init_board[pos[0]][i] == num) & (i != pos[1])) {
        return false;
      }
    }
    //check column
    for (let i = 0; i < 9; i++) {
      if ((this.init_board[i][pos[1]] == num) & (i != pos[0])) {
        return false;
      }
    }
    //check block
    let block_x = Math.floor(pos[0] / 3);
    let block_y = Math.floor(pos[1] / 3);
    for (let i = block_x * 3; i < block_x * 3 + 3; i++) {
      for (let j = block_y * 3; block_y * 3 + 3; j++) {
        if ((this.init_board[i][j] == num) & (i != pos[0]) & (j != pos[1])) {
          return false;
        }
      }
    }
    return true;
  }
}

const num_input = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const bo = new Board(0, 0, initial_board);
bo.draw();

class Input {
  constructor(x, y, input_array) {
    this.x = x;
    this.y = y;
    this.input_array = input_array;
  }

  draw() {
    for (let i = 0; i < this.input_array.length; i++) {
      let innerLength = this.input_array[i].length;
      for (let j = 0; j < innerLength; j++) {
        let tile = new Tile(
          this.x + TILE_WIDTH * j,
          this.y + TILE_HEIGHT * i,
          this.input_array[i][j]
        );
        tile.draw();
      }
    }
  }
}

const myInput = new Input(420, 50, num_input);
myInput.draw();

// selected cell
let sel_x = null;
let sel_y = null;

let input_x = null;
let input_y = null;
let input_num = 3;
let hasInput = false;

addEventListener("click", (e) => {
  if (hasInput) {
    sel_x = Math.floor(e.clientY / 40);
    sel_y = Math.floor(e.clientX / 40);
    fill_number(sel_y * 40, sel_x * 40, input_num);
    if (bo.valid(input_num, [sel_x, sel_y])) {
      // initial_board[(sel_x, sel_y)] = input_num;
      console.log("game not over");
    } else {
      console.log("game over");
    }
    console.log(sel_x, sel_y);
    hasInput = false;
  }
});

// select number
addEventListener("click", (e) => {
  if (
    !hasInput &
    (e.clientX > 430) &
    (e.clientX < 545) &
    (e.clientY > 60) &
    (e.clientY < 175)
  ) {
    input_x = Math.floor((e.clientY - 50) / 40);
    input_y = Math.floor((e.clientX - 420) / 40);
    input_num = num_input[input_x][input_y];
    hasInput = true;
  }
});
