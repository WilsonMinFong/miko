import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';

class Miko extends BoardObject {
  constructor(board) {
    super({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .85],
      vel: [0, 0],
      radius: 5,
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

  setImage(stage) {
    this.bitmap = new createjs.Bitmap("./assets/reimu_idle.png");

    this.bitmap.regX = 14;
    this.bitmap.regY = 24;
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];

    stage.addChild(this.bitmap);
  }

  shoot(e) {
    const bullet = new Bullet({
      pos: [this.pos[0], this.pos[1] - 2 * this.radius],
      vel: [0, -10],
      friendly: true,
      board: this.board
    });

    this.board.addBullet(bullet);
    bullet.draw(this.hitCircle.parent);
  }

  startShooting() {
    this.shooting = true;
  }

  stopShooting() {
    this.shooting = false;
  }

  collideWith(otherObj) {
    if (!otherObj.friendly) {
      this.lives -= 1;

      this.respawn();
    }
  }

  move() {
    super.move(0);

    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
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
}

Miko.VEL_SCALE = 5;

export default Miko;
