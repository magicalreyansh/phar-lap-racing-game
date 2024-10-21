let player = document.getElementById("player");
let npcs = [
  document.getElementById("npc1"),
  document.getElementById("npc2"),
  document.getElementById("pharLap")
];
let raceTrack = document.getElementById("raceTrack");
let startButton = document.getElementById("startButton");
let restartButton = document.getElementById("restartButton");
let countdown = document.getElementById("countdown");
let leaderboard = document.getElementById("leaderboard");
let playerSpeed = 0;
let npcSpeeds = [];

startButton.addEventListener("click", startGame);

function startGame() {
  // Set the difficulty
  let level = document.getElementById("level").value;
  if (level === "easy") playerSpeed = 5;
  else if (level === "medium") playerSpeed = 7;
  else playerSpeed = 9;

  // Set NPC speeds (Phar Lap is faster!)
  npcSpeeds = [Math.random() * 4 + 6, Math.random() * 4 + 6, Math.random() * 4 + 8];

  countdownRace();
}

function countdownRace() {
  let count = 3;
  countdown.innerHTML = count;
  let interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.innerHTML = count;
    } else {
      clearInterval(interval);
      countdown.innerHTML = "Go!";
      startRace();
    }
  }, 1000);
}

function startRace() {
  startButton.style.display = "none";
  let playerPos = 0;
  let npcPos = [0, 0, 0];
  let raceInterval = setInterval(() => {
    playerPos += playerSpeed;
    for (let i = 0; i < npcs.length; i++) {
      npcPos[i] += npcSpeeds[i];
      npcs[i].style.left = npcPos[i] + "px";
    }
    player.style.left = playerPos + "px";

    if (playerPos >= raceTrack.offsetWidth || npcPos.some(pos => pos >= raceTrack.offsetWidth)) {
      clearInterval(raceInterval);
      displayLeaderboard(playerPos, npcPos);
    }
  }, 100);
}

function displayLeaderboard(playerPos, npcPos) {
  let times = [playerPos, ...npcPos].map(pos => (pos / playerSpeed).toFixed(2));
  leaderboard.innerHTML = `
    <h2>Leaderboard</h2>
    <p>Player: ${times[0]} seconds</p>
    <p>NPC 1: ${times[1]} seconds</p>
    <p>NPC 2: ${times[2]} seconds</p>
    <p>Phar Lap: ${times[3]} seconds</p>
  `;
  restartButton.style.display = "block";
}

restartButton.addEventListener("click", () => {
  location.reload();
});
