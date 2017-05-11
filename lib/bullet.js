import BoardObject from './board_object';

class Bullet extends BoardObject {
  constructor(options) {
    super({
      pos: options.pos,
      vel: options.vel,
      radius: options.radius || 5,
      isFriendly: options.isFriendly,
      board: options.board,
      canLeaveBoard: true
    });

    this.damage = options.damage || 10;
    this.shooter = options.shooter;

    this.draw(options.imageId);
  }

  draw(imageId) {
    this.board.addObject(this);
    super.draw(this.shooter.container.parent);
    this.setImage(imageId);
  }

  collideWith(otherObj) {
    if (
      !this.isRemoved() &&
      this.isFriendly !== otherObj.isFriendly &&
      !(otherObj instanceof Bullet)
    ) {
      this.remove();
    }
  }
}

export default Bullet;
