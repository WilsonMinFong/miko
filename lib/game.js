// Provides createjs globally
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import * as firebase from "firebase";
import Board from './board';
import BoardView from './board_view';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCFroL6v3St39D82ed2JBzRmwZVlnrCu2E",
    authDomain: "miko-494c9.firebaseapp.com",
    databaseURL: "https://miko-494c9.firebaseio.com",
    projectId: "miko-494c9",
    storageBucket: "miko-494c9.appspot.com",
    messagingSenderId: "1001749949763"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  const queue = new createjs.LoadQueue(false);
  const beginGame = () => {
    const stage = new createjs.Stage("gameCanvas");
    const board = new Board(queue);

    new BoardView(board, stage).start();
  };

  queue.on('complete', beginGame, this);
  queue.loadManifest([
    { id: "miko", src: "./assets/reimu_idle.png" },
    { id: "blue_bullet", src: "./assets/blue_bullet.png" },
    { id: "red_bullet", src: "./assets/red_bullet.png" },
    { id: "yokai", src: "./assets/marisa.png" }
  ]);
});
