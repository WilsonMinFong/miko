import BoardObject from './board_object';

class Bullet extends BoardObject {
  constructor(options) {
    options = Object.assign({
      radius: 5,
      canLeaveBoard: true,
      damage: 10
    }, options);

    super(options);

    this.damage = options.damage;
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
