// All circle selector circles are circle container
const circles = document.querySelectorAll(".circle");
console.log(circles);
const scoreTextAll = document.querySelectorAll(".score");
const scoreMain = document.querySelector(".score-main");
const scoreModal = document.querySelector(".score-modal");
scoreModal.textContent = 12;
const overlay = document.querySelector("#overlay");
//  All Buttons
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const closeButton = document.querySelector("#close");

// Global variable
let active = 0;
let score = 0;
let speed = 2000;
let round = 0;
let timer;

// need random number so that circle get highligthed after starting the game and make sure number is not repeated twice

let getRandomNum = (active) => {
  let randomNum = Math.floor(Math.random() * 4);
  if (active === randomNum) {
    randomNum = Math.floor(Math.random() * 4);
  }
  return randomNum;
};

// every right click score will be updated

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    console.log("index cliked", i);
    rightClick(i);
  });
});
// right click function for event lister for every circles
let rightClick = (i) => {
  if (i != active) stopGame();
  else {
    score++;
    round--;
    console.log("score", score);
    scoreMain.textContent = score;
  }
};

///starting the game main fucntion

let startGame = () => {
  console.log("---starting the game main fucntion----");
  circles.forEach((circle) => {
    circle.pointerEvents = "auto";
  });
  // Flipping the buttons after game started so that we can find the stop button
  startButton.style.display = "none";
  stopButton.style.display = "inline-block";
  // CALL RANDOM FUNC TO GET NEW ACTIVE CIRCLE
  let newlyactive = getRandomNum(active);
  circles[newlyactive].classList.toggle("active");
  circles[active].classList.remove("active");
  // NOT REPEAT SAME CIRCLE
  active = newlyactive;
  console.log("display newly active circle", active);
  /// CALL START GAME BY SET TIME OUT TO REDERING THE CIRCLE
  timer = setTimeout(startGame, speed);

  speed = speed - 10;
  round++;
  scoreModal.textContent = score;
  if (round >= 5) {
    stopGame();
  }
};

//display scores in modal and main dashbord
scoreModal.textContent = score;

// Stop the game during play to visible the overlay
let stopGame = () => {
  console.log("--end game--");
  clearTimeout(timer);
  overlay.style.visibility = "visible";
};
// close modal and winddow reload
let closeGame = () => {
  window.location.reload();
};
// All event lister
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
closeButton.addEventListener("click", closeGame);
