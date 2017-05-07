import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';

class Miko extends BoardObject {
  constructor(board) {
    super({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .85],
      vel: [0, 0],
      radius: 5,
      color: 'blue',
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
    // this.setSprite(stage);
  }

  setImage(stage) {
    this.bitmap = new createjs.Bitmap(this.board.assets.getResult('miko'));

    this.bitmap.regX = 14;
    this.bitmap.regY = 24;

    this.container.addChild(this.bitmap);
  }

  // setSprite(stage) {
  //   const spriteSheet = new createjs.SpriteSheet({
  //     images: [this.board.assets.getResult('miko_sprite')],
  //     frames: {width: 31, height: 44, regX: 14, regY: 24},
  //     animations: {
  //         idle: [0, 1, 2, 3, 2, 1, 0]
  //     },
  //     framerate: 6
  //   });
  //
  //   this.sprite = new createjs.Sprite(spriteSheet);
  //   stage.addChild(this.sprite);
  //   this.sprite.gotoAndPlay("idle");
  // }

  shoot(e) {
    const bullet = new Bullet({
      pos: [this.pos[0], this.pos[1] - 2 * this.radius],
      vel: [0, -10],
      friendly: true,
      board: this.board,
      shooter: this
    });
  }

  startShooting() {
    this.shooting = true;
  }

  stopShooting() {
    this.shooting = false;
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
}

Miko.VEL_SCALE = 5;

export default Miko;
