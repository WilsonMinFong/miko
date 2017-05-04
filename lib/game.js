// Provides createjs globally
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import Board from './board';
import BoardView from './board_view';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("gameCanvas").style.backgroundColor = 'black';
  const stage = new createjs.Stage("gameCanvas");
  const board = new Board();

  new BoardView(board, stage).start();
});
