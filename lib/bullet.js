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
  }
}

export default Bullet;
