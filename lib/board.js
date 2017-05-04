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

    stage.update();
  }

  addYokai(n) {
    for (let i = 0; i < n; i++) {
      this.addObject(new Yokai());
    }
  }

  addMiko() {
    const miko = new Miko();
    this.miko = miko;
    return miko;
  }
}

Board.DIM_X = 650;
Board.DIM_Y = 750;

export default Board;
