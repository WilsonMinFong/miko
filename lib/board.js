import Miko from './miko';
import Yokai from './yokai';
import Bullet from './bullet';

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
    return Array.prototype.concat(this.yokai, this.bullets, this.miko);
  }

  drawObjects(stage) {
    this.yokai.forEach((obj) => {
      obj.draw(stage);
    });

    this.miko.draw(stage);

    stage.update();
  }

  moveObjects(stage) {
    this.allObjects().forEach((obj) => {
      obj.move();
    });

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

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  isOutOfBounds(pos, radius) {
    if (
      pos[0] + radius < 0 || pos[0] - radius > Board.DIM_X ||
      pos[1] + radius < 0 || pos[1] - radius > Board.DIM_Y
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkCollisions() {
    // const allObjects = this.allObjects();
    //
    // for (let i = 0; i < allObjects.length; i++) {
    //   for (let j = i + 1; j < allObjects.length; j++) {
    //     if (allObjects[i].isCollidedWith(allObjects[j])) {
    //       allObjects[i].collideWith(allObjects[j]);
    //       allObjects[j].collideWith(allObjects[i]);
    //     }
    //   }
    // }
    this.yokai.forEach((obj) => {
      if (obj.isCollidedWith(this.miko)) {
        this.miko.collideWith(obj);
      }
    });
  }

  remove(obj) {
    if (obj instanceof Yokai) {
      this.yokai.splice(this.yokai.indexOf(obj), 1);
    } else if (obj instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj instanceof Miko) {
      this.miko = null;
    } else {
      throw "Unknown object type";
    }
  }
}

Board.DIM_X = 650;
Board.DIM_Y = 750;

export default Board;
