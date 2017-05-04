import Util from './util.js';

class BoardObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.friendly = options.friendly;
    this.board = options.board;
    this.canLeaveBoard = true;
  }

  collideWith(otherObj) {

  }

  draw(stage) {
    const { color, pos, radius } = this;

    const circle = new createjs.Shape();
    this.circle = circle;

    circle.graphics.beginFill(color).drawCircle(0, 0, radius);

    circle.x = pos[0];
    circle.y = pos[1];

    stage.addChild(circle);

    stage.update();
  }

  isCollidedWith(otherObj) {
    const centerDist = Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  }

  move(dt) {
    const velocityScale = dt / NORMAL_DT,
      dx = this.vel[0] * velocityScale,
      dy = this.vel[1] * velocityScale;

    const pos = [this.pos[0] + dx, this.pos[1] + dy];

    if (this.board.isOutOfBounds(pos)) {
      if (this.canLeaveBoard) {
        // this.destroy();
      }
    } else {
      this.pos = pos;
      this.circle.x = pos[0];
      this.circle.y = pos[1];
    }
  }
}

const NORMAL_DT = 1000/60;

export default BoardObject;
