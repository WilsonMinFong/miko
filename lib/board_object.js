import Util from './util';

class BoardObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.isFriendly = options.isFriendly;
    this.board = options.board;
    this.canLeaveBoard = options.canLeaveBoard;

    this.container = new createjs.Container();
    this._setContainerPos();
  }

  addHitCircle(color) {
    const { pos, radius } = this;

    const hitCircle = new createjs.Shape();

    hitCircle
      .graphics
      .beginRadialGradientFill(["white",color], [0, 1], 0, 0, 0, 0, 0, radius)
      .drawCircle(0, 0, radius);

    this.container.addChild(hitCircle);
  }

  collideWith(otherObj) {

  }

  draw(stage) {
    stage.addChild(this.container);
  }

  isCollidedWith(otherObj) {
    const centerDist = Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  }

  isRemoved() {
    return !this.container.parent;
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

  setImage(imageId, regX, regY) {
    const image = this.board.assets.getResult(imageId);
    const bitmap = new createjs.Bitmap(image);

    bitmap.regX = regX || bitmap.getBounds().width / 2;
    bitmap.regY = regY || bitmap.getBounds().height / 2;

    this.container.addChild(bitmap);
  }

  _setContainerPos() {
    this.container.x = this.pos[0];
    this.container.y = this.pos[1];
  }
}

export default BoardObject;
