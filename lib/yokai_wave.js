import Yokai from './yokai';
import Board from './board';

class YokaiWave {
  constructor(options) {
    this.count = options.count;
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.board = options.board;
    this.shootingPattern = options.shootingPattern;
  }

  generate() {
    for (let i = 0; i < this.count; i++) {
      const options = {
        pos: this.startPos ? this.startPos[i] : Board.generateRandomPosition({ maxY: 0 }),
        endPos: this.endPos ? this.endPos[i] : Board.generateRandomPosition({ maxY: 0.5 * Board.DIM_Y }),
        board: this.board,
        shootingPattern: this.shootingPattern
      };

      const yokai = new Yokai(options);
      this.board.addObject(yokai);
    }
  }
}

export default YokaiWave;
