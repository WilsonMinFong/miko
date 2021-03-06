import Miko from './miko';
import Yokai from './yokai';
import Bullet from './bullet';
import SHOOTING_PATTERNS from './shooting_patterns';
import YokaiWave from './yokai_wave';

class Board {
  constructor(assets) {
    this.yokai = [];
    this.bullets = [];
    this.miko = new Miko({ board: this });
    this.currentScore = 0;
    this.assets = assets;

    this.addYokaiWave();
  }

  addScore(score) {
    this.currentScore += score;
  }

  allObjects() {
    return Array.prototype.concat(this.yokai, this.bullets, this.miko);
  }

  addObject(obj) {
    if (obj instanceof Miko) {
      this.miko = obj;
    } else if (obj instanceof Yokai) {
      this.yokai.push(obj);
    } else if (obj instanceof Bullet) {
      this.bullets.push(obj);
    } else {
      return false;
    }

    return obj;
  }

  addYokaiWave() {
    new YokaiWave({
      count: 1,
      board: this,
      shootingPattern: SHOOTING_PATTERNS['circle']()
    }).generate();
  }

  drawYokaiWave(stage) {
    this.yokai.forEach(y => y.draw(stage));
  }

  drawObjects(stage) {
    this.yokai.forEach((obj) => {
      obj.draw(stage);
    });

    this.miko.draw(stage);
  }

  moveObjects(stage) {
    this.allObjects().forEach((obj) => {
      obj.move();
    });

    this.checkCollisions();
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
    const allObjects = this.allObjects();

    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        if (allObjects[i].isCollidedWith(allObjects[j])) {
          allObjects[i].collideWith(allObjects[j]);
          allObjects[j].collideWith(allObjects[i]);
        }
      }
    }
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

  reset() {
    this.allObjects().forEach((obj) => {
      obj.remove();
    });

    this.yokai = [];
    this.bullets = [];
    this.miko = new Miko({ board: this });
    this.currentScore = 0;

    this.addYokaiWave();
  }
}

Board.generateRandomPosition = (options) => {
  let { minX, minY, maxX, maxY } = options;

  minX = Number.isInteger(minX) ? minX : 0;
  minY = Number.isInteger(minY) ? minY : 0;
  maxX = Number.isInteger(maxX) ? maxX : Board.DIM_X;
  maxY = Number.isInteger(maxY) ? maxY : Board.DIM_Y;

  const randX = Math.floor(Math.random() * (maxX - minX) + minX);
  const randY = Math.floor(Math.random() * (maxY - minY) + minY);

  return [randX, randY];
};

Board.DIM_X = 650;
Board.DIM_Y = 700;

export default Board;
