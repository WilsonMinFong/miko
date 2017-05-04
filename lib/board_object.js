class BoardObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.friendly = options.friendly;
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

  move(dt) {
    const velocityScale = dt / NORMAL_DT,
      dx = this.vel[0] * velocityScale,
      dy = this.vel[1] * velocityScale;

    const x = this.pos[0] + dx;
    const y = this.pos[1] + dy;

    this.pos = [x, y];

    this.circle.x = x;
    this.circle.y = y;
  }
}

const NORMAL_DT = 1000/60;

export default BoardObject;
