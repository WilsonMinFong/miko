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

    this.horizontalKeys = {};
    this.verticalKeys = {};
  }

  bindKeyDown() {
    Object.keys(BoardView.MOVEMENT_DIRS).forEach((key) => {
      document.addEventListener('keydown', (e) => {
        const move = BoardView.MOVEMENT_DIRS[e.key];

        this._setMovementKeyPress(e);

        if (move) {
          this.miko.setMovement(move);
        }
      });
    });
  }

  bindKeyUp() {
    document.addEventListener('keyup', (e) => {
      const move = BoardView.MOVEMENT_DIRS[e.key];

      this._setMovementKeyPress(e);

      if (move) {
        this.miko.removeMovement(move);

        this._addRemainingMovement(e.key);
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

  _setMovementKeyPress(e) {
    const key = e.key;

    if (key === KEY_LEFT || key === KEY_RIGHT) {
      this.horizontalKeys[key] = e.type === 'keydown';
    } else if (key === KEY_UP || key === KEY_DOWN) {
      this.verticalKeys[key] = e.type === 'keydown';
    }
  }

  _addRemainingMovement(key) {
    let otherKey;

    if (Object.keys(this.horizontalKeys).includes(key)) {
      otherKey = Object.keys(this.horizontalKeys).find((dir) => {
        return this.horizontalKeys[dir];
      });
    } else if (Object.keys(this.verticalKeys).includes(key)) {
      otherKey = Object.keys(this.verticalKeys).find((dir) => {
        return this.verticalKeys[dir];
      });
    }

    if (otherKey) {
      const move = BoardView.MOVEMENT_DIRS[otherKey];

      this.miko.setMovement(move);
    }
  }

  _getMove() {
    return [this._getHorizontalMove(), this._getVerticalMove()];
  }

  _getHorizontalMove() {
    if (this.horizontalKeys.length !== 0) {
      const last = this.horizontalKeys[this.horizontalKeys.length - 1];
      return BoardView.MOVEMENT_DIRS[last][0];
    } else {
      return 0;
    }
  }

  _getVerticalMove() {
    if (this.verticalKeys.length !== 0) {
      const last = this.verticalKeys[this.verticalKeys.length - 1];
      return BoardView.MOVEMENT_DIRS[last][1];
    } else {
      return 0;
    }
  }
}

BoardView.MOVEMENT_DIRS = {
  [KEY_UP]: [0, -1],
  [KEY_DOWN]: [0, 1],
  [KEY_LEFT]: [-1, 0],
  [KEY_RIGHT]: [1, 0]
};

export default BoardView;
