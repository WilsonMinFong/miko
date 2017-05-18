import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';
import Miko from './miko';
import Util from './util';

class Yokai extends BoardObject {
  constructor(options) {
    options = Object.assign({
      pos: [0, 0],
      vel: [0, 0],
      radius: 12,
      isFriendly: false,
      canLeaveBoard: true,
      health: 50,
      score: 1000
    }, options);

    super(options);

    this.health = options.health;
    this.score = options.score;

    this.endPos = options.endPos;

    this.shootingPattern = options.shootingPattern;

    this.startShooting();

    this.shoot = this.shoot.bind(this);
  }

  draw(stage) {
    super.draw(stage);
    this.setImage('yokai');
  }

  move() {
    if (this.nearEndPos()) {
      this.resetEndPos();
    }

    this.vel = [
      (this.endPos[0] - this.pos[0]) / 100,
      (this.endPos[1] - this.pos[1]) / 100
    ];

    super.move();
  }

  resetEndPos() {
    this.endPos = Board.generateRandomPosition({
      maxY: 0.5 * Board.DIM_Y
    });
  }

  nearEndPos() {
    return Math.round(this.vel[0]) === 0 &&
      Math.round(this.vel[1]) === 0;
  }

  collideWith(otherObj) {
    if (this.isRemoved()) {
      return;
    }

    if (otherObj.isFriendly) {
      if (otherObj instanceof Bullet) {
        this.takeDamage(otherObj.damage);
      } else if (otherObj instanceof Miko) {
        this.remove();
      }
    }
  }

  takeDamage(dmg) {
    this.health -= dmg;

    if (this.health < 0) {
      this.remove();
    }

    this._blinkContainer();
  }

  shoot(e) {
    this.shootingPattern(this);
  }

  startShooting() {
    this.shootInterval = setInterval(() => {
      if (!createjs.Ticker.paused) {
        this.shoot();
      }
    }, 1500);
  }

  remove() {
    clearInterval(this.shootInterval);
    this.board.addScore(this.score);
    super.remove();
  }

  _blinkContainer() {
    this.container.visible = false;

    setTimeout(() => {
      this.container.visible = true;
    }, 100);
  }
}

Yokai.VEL_SCALE = 5;

export default Yokai;
