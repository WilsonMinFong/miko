import Bullet from './bullet';

const SHOOTING_PATTERNS = {
  straight: (velScale = 1) => {
    return (obj) => {
      const bullet = new Bullet({
        pos: [obj.pos[0], obj.pos[1] + 2 * obj.radius],
        vel: [0, velScale],
        friendly: obj.friendly,
        board: obj.board,
        shooter: obj
      });
    };
  },

  circle: (numBullets = 10, velScale = 1) => {
    return (obj) => {
      for (let i = 0; i < numBullets; i++) {
        const bullet = new Bullet({
          pos: [
            obj.pos[0] + Math.sin(2 * Math.PI * (i / numBullets)),
            obj.pos[1] + Math.cos(2 * Math.PI * (i / numBullets))],
          vel: [
            velScale * Math.sin(2 * Math.PI * (i / numBullets)),
            velScale * Math.cos(2 * Math.PI * (i / numBullets))
          ],
          friendly: obj.friendly,
          board: obj.board,
          shooter: obj
        });
      }
    };
  }
};

export default SHOOTING_PATTERNS;
