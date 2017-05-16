import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';

class Miko extends BoardObject {
  constructor(options) {
    options = Object.assign({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .85],
      vel: [0, 0],
      radius: 6,
      isFriendly: true,
      canLeaveBoard: false,
      shooting: false
    }, options);

    super(options);

    this.lives = 5;
  }

  collideWith(otherObj) {
    if (this.isRemoved()) {
      return;
    }

    if (!otherObj.isFriendly) {
      this.lives -= 1;

      this.respawn();
    }
  }

  draw(stage) {
    this.setImage('miko', 14, 24);
    this.addHitCircle('green');
    super.draw(stage);
  }

  isDead() {
    return this.lives === 0;
  }

  move() {
    super.move(0);
  }

  remove() {
    this.stopShooting();
    super.remove();
  }

  removeMovement(dir) {
    this.vel[0] = dir[0] !== 0 ? 0 : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? 0 : this.vel[1];
  }

  respawn() {
    this.pos = [Board.DIM_X / 2, Board.DIM_Y * .85];
  }

  setMovement(dir) {
    this.vel[0] = dir[0] !== 0 ? Miko.VEL_SCALE * dir[0] : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? Miko.VEL_SCALE * dir[1] : this.vel[1];
  }

  shoot(e) {
    const bullet = new Bullet({
      pos: [this.pos[0], this.pos[1] - 2 * this.radius],
      vel: [0, -8],
      isFriendly: true,
      board: this.board,
      shooter: this,
      imageId: 'red_bullet'
    });
  }

  startShooting() {
    if (!this.shootInterval) {
      this.shootInterval = setInterval(this.shoot.bind(this), 1000/10);
    }
  }

  stopShooting() {
    clearInterval(this.shootInterval);
    this.shootInterval = undefined;
  }
}

Miko.VEL_SCALE = 5;

export default Miko;
