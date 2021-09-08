export function valid(bo, num, pos) {
  //check row
  for (let i = 0; i < 9; i++) {
    if ((bo[pos[0]][i] == num) & (i != pos[1])) {
      return false;
    }
  }
  //check column
  for (let i = 0; i < 9; i++) {
    if ((bo[i][pos[1]] == num) & (i != pos[0])) {
      return false;
    }
  }
  //check block
  let block_x = Math.floor(pos[0] / 3);
  let block_y = Math.floor(pos[1] / 3);
  for (let i = block_x * 3; i < block_x * 3 + 3; i++) {
    for (let j = block_y * 3; block_y * 3 + 3; j++) {
      if ((bo[i][j] == num) & (i != pos[0]) & (j != pos[1])) {
        return false;
      }
    }
  }
  return true;
}
