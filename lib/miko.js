import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';

class Miko extends BoardObject {
  constructor(board) {
    super({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .85],
      vel: [0, 0],
      radius: 6,
      color: 'green',
      friendly: true,
      board,
      canLeaveBoard: false,
      shooting: false
    });

    this.lives = 5;
  }

  draw(stage) {
    this.setImage(stage);
    super.draw(stage);
  }

  setImage() {
    const image = this.board.assets.getResult('miko');
    const bitmap = new createjs.Bitmap(image);

    bitmap.regX = 14;
    bitmap.regY = 24;

    this.container.addChild(bitmap);
  }

  shoot(e) {
    const bullet = new Bullet({
      pos: [this.pos[0], this.pos[1] - 2 * this.radius],
      vel: [0, -8],
      friendly: true,
      board: this.board,
      shooter: this,
      bitmap: this.board.assets.getResult('red_bullet')
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

  collideWith(otherObj) {
    if (this.isRemoved()) {
      return;
    }

    if (!otherObj.friendly) {
      this.lives -= 1;

      this.respawn();
    }
  }

  move() {
    super.move(0);
  }

  setMovement(dir) {
    this.vel[0] = dir[0] !== 0 ? Miko.VEL_SCALE * dir[0] : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? Miko.VEL_SCALE * dir[1] : this.vel[1];
  }

  removeMovement(dir) {
    this.vel[0] = dir[0] !== 0 ? 0 : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? 0 : this.vel[1];
  }

  respawn() {
    this.pos = [Board.DIM_X / 2, Board.DIM_Y * .85];
  }

  dead() {
    return this.lives === 0;
  }

  remove() {
    this.stopShooting();
    super.remove();
  }
}

Miko.VEL_SCALE = 5;

export default Miko;
