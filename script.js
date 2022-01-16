import { setupDino, updateDino, getDinoRect, setDinoLose } from "./dino.js";
import { setupCactus, updateCactus, getCactusRects } from "./cactus.js";
import { setupGround, updateGround } from "./ground.js";

// These variables are for aspect ratio we want to keep
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

// Current Speed of the Game
const SPEED_FACTOR = 0.00001;

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startScreenElement = document.querySelector("[data-start-screen]");

// this function will resize the world according to the Window Size
const scaleWorld = () => {
  let scaleFactor = Math.min(
    window.innerWidth / WORLD_WIDTH,
    window.innerHeight / WORLD_HEIGHT
  );
  worldElement.style.width = `${WORLD_WIDTH * scaleFactor}px`;
  worldElement.style.height = `${WORLD_HEIGHT * scaleFactor}px`;
};

// for first time Scaling
scaleWorld();

// scale function will be called every time Window resizes
window.addEventListener("resize", scaleWorld);

//this function is used to perform required animation before the next repaint
let score;
let lastTime;
let speedScale;

// check for the collision
const isCollision = (rect1, rect2) => {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
};

//checks for if dino has interacted with cactus or not if yes then returns true
const checkLose = () => {
  const dinoRect = getDinoRect();
  return getCactusRects().some((cactusRect) =>
    isCollision(cactusRect, dinoRect)
  );
};

// when we lose
const handleLose = () => {
  setDinoLose();
  startScreenElement.textContent = 
                                    `Game Over 
                              Press Any Key To Start`
  startScreenElement.classList.remove('hide');
  // Wait for 500ms before Player can again set
  setTimeout((()=>{
    document.addEventListener("keydown", handleStart, { once: true });
  }),500)

}

// updates the dom
const update = (time) => {
  if (lastTime == null) {
    lastTime = time;
    requestAnimationFrame(update);
    return;
  }
  let delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeed(delta);
  updateScore(delta);
  
  lastTime = time;
  // if the playerLost return
  if (checkLose()) {
    return handleLose();
  }
  window.requestAnimationFrame(update);
};

const updateSpeed = (delta) => {
  // increase speed by a contant factor
  speedScale += delta * SPEED_FACTOR;
};

const updateScore = (delta) => {
  //makes sure score is in integer form
  scoreElement.textContent = Math.floor(score);
  // increment score
  score += delta * 0.01;
};
// this takes cares of How the game starts
function handleStart()  {
  score = 0;
  lastTime = null;
  speedScale = 1;
  setupGround();
  setupDino();
  setupCactus();

  // hide the Start Screen When game begins
  startScreenElement.classList.add("hide");

  window.requestAnimationFrame(update);
};

// this event listener start the game when user press any only once.
document.addEventListener("keydown", handleStart, { once: true });
