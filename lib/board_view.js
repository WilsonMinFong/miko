// useful keycodes
var KEY_UP = 'ArrowUp';
var KEY_LEFT = 'ArrowLeft';
var KEY_RIGHT = 'ArrowRight';
var KEY_DOWN = 'ArrowDown';

class BoardView {
  constructor(board, stage) {
    this.board = board;
    this.stage = stage;
    this.miko = board.addMiko();
  }

  bindKeyDown() {
    Object.keys(BoardView.MOVEMENT_DIRS).forEach((key) => {
      document.addEventListener('keydown', (e) => {
        const move = BoardView.MOVEMENT_DIRS[e.key];

        if (move) {
          this.miko.addMovement(move);
        }
      });
    });
  }

  bindKeyUp() {
    document.addEventListener('keyup', (e) => {
      const move = BoardView.MOVEMENT_DIRS[e.key];

      if (move) {
        this.miko.removeMovement(move);
      }
    });
  }

  start () {
    this.board.drawObjects(this.stage);

    this.bindKeyDown();
    this.bindKeyUp();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", () => {
      this.board.moveObjects(this.stage);
    });
  }
}

BoardView.MOVEMENT_DIRS = {
  [KEY_UP]: [0, -1],
  [KEY_DOWN]: [0, 1],
  [KEY_LEFT]: [-1, 0],
  [KEY_RIGHT]: [1, 0]
};

export default BoardView;
