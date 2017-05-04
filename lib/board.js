import Miko from './miko';
import Yokai from './yokai';

class Board {
  constructor() {
    this.yokai = [];
    this.bullets = [];
    this.miko = null;

    this.addYokai(10);
  }

  addObject(obj) {
    this.yokai.push(obj);
    return obj;
  }

  allObjects() {
    return this.yokai + this.bullets + [this.miko];
  }

  drawObjects(stage) {
    this.yokai.forEach((obj) => {
      obj.draw(stage);
    });

    this.miko.draw(stage);

    stage.update();
  }

  moveObjects(stage) {
    this.yokai.forEach((obj) => {
      obj.move(1000/60);
    });

    this.miko.move(1000/60);

    this.checkCollisions();

    stage.update();
  }

  addYokai(n) {
    for (let i = 0; i < n; i++) {
      this.addObject(new Yokai(this));
    }
  }

  addMiko() {
    const miko = new Miko(this);
    this.miko = miko;
    return miko;
  }

  isOutOfBounds(pos) {
    if (
      pos[0] < 0 || pos[0] > Board.DIM_X ||
      pos[1] < 0 || pos[1] > Board.DIM_Y
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkCollisions() {
    this.yokai.forEach((obj) => {
      if (obj.isCollidedWith(this.miko)) {
        this.miko.collideWith(obj);
      }
    });
  }
}

Board.DIM_X = 650;
Board.DIM_Y = 750;

export default Board;
