// Provides createjs globally
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import Board from './board';
import BoardView from './board_view';


document.addEventListener('DOMContentLoaded', () => {
  const queue = new createjs.LoadQueue(false);
  const beginGame = () => {
    const stage = new createjs.Stage("gameCanvas");
    const board = new Board(queue);

    new BoardView(board, stage).start();
  };

  queue.on('complete', beginGame, this);
  queue.loadManifest([
    { id: "miko", src: "./assets/reimu_idle.png" },
    { id: "miko_sprite", src: "./assets/reimu_idle_sprite.png" },
    { id: "blue_bullet", src: "./assets/blue_bullet.png" },
    { id: "red_bullet", src: "./assets/red_bullet.png" },
    { id: "yokai", src: "./assets/marisa.png" }
  ]);
});
