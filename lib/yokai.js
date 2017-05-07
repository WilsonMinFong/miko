import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';
import Miko from './miko';

class Yokai extends BoardObject {
  constructor(options) {
    super({
      pos: options.pos || [0, 0],
      vel: options.vel || [0, 0],
      radius: options.radius || 10,
      color: options.color || 'red',
      friendly: false,
      board: options.board,
      canLeaveBoard: true
    });

    this.health = options.health || 100;
    this.score = options.score || 1000;

    this.endPos = options.endPos;

    this.shootingPattern = options.shootingPattern;

    this.startShooting();
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

    if (otherObj.friendly) {
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
    this.shootInterval = setInterval(this.shoot.bind(this), 1000);
  }

  remove() {
    clearInterval(this.shootInterval);
    this.board.addScore(this.score);
    super.remove();
  }
}

Yokai.VEL_SCALE = 5;

export default Yokai;
