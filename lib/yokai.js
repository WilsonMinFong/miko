import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';
import Miko from './miko';

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
  }

  draw(stage) {
    super.draw(stage);
    this.setImage('yokai');
  }

  move() {
    this.vel = [
      (this.endPos[0] - this.pos[0]) / 100,
      (this.endPos[1] - this.pos[1]) / 100
    ];

    super.move();
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
  }

  shoot(e) {
    this.shootingPattern(this);
  }

  startShooting() {
    this.shootInterval = setInterval(this.shoot.bind(this), 1500);
  }

  remove() {
    clearInterval(this.shootInterval);
    this.board.addScore(this.score);
    super.remove();
  }
}

Yokai.VEL_SCALE = 5;

export default Yokai;
