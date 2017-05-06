import BoardObject from './board_object';

class Bullet extends BoardObject {
  constructor(options) {
    super({
      pos: options.pos,
      vel: options.vel,
      radius: 5,
      color: 'white',
      friendly: options.friendly,
      board: options.board,
      canLeaveBoard: true
    });

    this.damage = 10;
    this.shooter = options.shooter;

    this.draw();
  }

  draw() {
    this.board.addObject(this);
    super.draw(this.shooter.hitCircle.parent);
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
