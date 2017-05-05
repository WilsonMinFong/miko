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
  }

  collideWith(otherObj) {

  }

  draw(stage) {
    const { color, pos, radius } = this;

    const circle = new createjs.Shape();
    this.circle = circle;

    const x = pos[0];
    const y = pos[1];

    // circle.graphics.beginFill(color).drawCircle(0, 0, radius);
    circle
      .graphics
      .beginRadialGradientFill(["white",color], [0, 1], 0, 0, 0, 0, 0, radius)
      .drawCircle(0, 0, radius);

    circle.x = pos[0];
    circle.y = pos[1];

    stage.addChild(circle);

    stage.update();
  }

  isCollidedWith(otherObj) {
    const centerDist = Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  }

  move(radius = this.radius) {
    const velocityScale = 1,
      dx = this.vel[0] * velocityScale,
      dy = this.vel[1] * velocityScale;

    const pos = [this.pos[0] + dx, this.pos[1] + dy];

    if (this.board.isOutOfBounds(pos, radius)) {
      if (this.canLeaveBoard) {
        this.remove();
      }
    } else {
      this.pos = pos;
      this.circle.x = pos[0];
      this.circle.y = pos[1];
    }
  }

  remove() {
    if (this.circle.parent) {
      this.circle.parent.removeChild(this.circle);
      this.board.remove(this);
    }
  }
}

const NORMAL_DT = 1000/60;

export default BoardObject;
