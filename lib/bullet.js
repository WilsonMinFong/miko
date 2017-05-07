import BoardObject from './board_object';

class Bullet extends BoardObject {
  constructor(options) {
    super({
      pos: options.pos,
      vel: options.vel,
      radius: options.radius || 5,
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

    bitmap.regX = bitmap.getBounds().width / 2;
    bitmap.regY = bitmap.getBounds().height / 2;

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
