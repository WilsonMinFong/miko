import BoardObject from './board_object';

class Bullet extends BoardObject {
  constructor(options) {
    super({
      pos: options.pos,
      vel: options.vel,
      radius: 7,
      color: 'white',
      friendly: options.friendly,
      board: options.board,
      canLeaveBoard: true
    });

    this.damage = 10;
    this.shooter = options.shooter;
    this.bitmap = options.bitmap;

    this.draw();
  }

  setImage() {
    const bitmap = new createjs.Bitmap(this.bitmap);

    bitmap.regX = bitmap.regY = 8;

    this.container.addChild(bitmap);
  }

  draw() {
    this.board.addObject(this);
    super.draw(this.shooter.container.parent);
    this.setImage();
  }

  collideWith(otherObj) {
    if (this.isRemoved()) {
      return;
    }

    if (this.friendly !== otherObj.friendly && !(otherObj instanceof Bullet)) {
      this.remove();
    }
  }
}

export default Bullet;
