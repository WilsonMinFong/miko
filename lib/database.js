import * as firebase from "firebase";

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

const updateLeaderboard = (highScores) => {
  const leaderboard = document.getElementById('leaderboard');

  while (leaderboard.firstChild) {
    leaderboard.removeChild(leaderboard.firstChild);
  }

  highScores.forEach((scoreObj, i) => {
    const tableRow = document.createElement("tr"),
          pos = document.createElement("td"),
          name = document.createElement("td"),
          score = document.createElement("td");

    pos.innerHTML = i + 1;
    name.innerHTML = scoreObj.name;
    score.innerHTML = scoreObj.score;

    tableRow.appendChild(pos);
    tableRow.appendChild(name);
    tableRow.appendChild(score);

    leaderboard.appendChild(tableRow);
  });
};

const Database = {
  getLeaderboard() {
    firebase.database().ref('/scores/easy').on('value', (snapshot) => {
      const highScores = snapshot.val();
      this.highScores = highScores;
      updateLeaderboard(highScores);
    });
  },
  updateLeaderboard(scoreObj) {
    firebase.database().ref('/scores/easy').transaction((scores) => {
      if (scores) {
        for (let i = 0; i < scores.length; i++) {
          if (scoreObj.score > scores[i].score) {
            const tempScoreObj = scores[i];
            scores[i] = scoreObj;
            scoreObj = tempScoreObj;
          }
        }
      }
      return scores;
    });
  },
  checkLeaderboard(score) {
    return score > this.highScores[this.highScores.length - 1].score;
  }
};

export default Database;
