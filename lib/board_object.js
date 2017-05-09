import Util from './util';

class BoardObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.friendly = options.friendly;
    this.board = options.board;
    this.canLeaveBoard = options.canLeaveBoard;

    this.container = new createjs.Container();
    this._setContainerPos();
  }

  _setContainerPos() {
    this.container.x = this.pos[0];
    this.container.y = this.pos[1];
  }

  collideWith(otherObj) {

  }

  isRemoved() {
    return !this.container.parent;
  }

  draw(stage) {
    const { color, pos, radius } = this;

    const hitCircle = new createjs.Shape();

    hitCircle
      .graphics
      .beginRadialGradientFill(["white",color], [0, 1], 0, 0, 0, 0, 0, radius)
      .drawCircle(0, 0, radius);

    this.container.addChild(hitCircle);
    stage.addChild(this.container);
  }

  isCollidedWith(otherObj) {
    const centerDist = Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  }

  move(radius = this.radius) {
    const dx = this.vel[0], dy = this.vel[1];

    const pos = [this.pos[0] + dx, this.pos[1] + dy];

    if (this.board.isOutOfBounds(pos, radius)) {
      if (this.canLeaveBoard) {
        this.remove();
      }
    } else {
      this.pos = pos;
      this._setContainerPos();
    }
  }

  remove() {
    this.container.parent.removeChild(this.container);
    this.board.remove(this);
  }
}

export default BoardObject;
