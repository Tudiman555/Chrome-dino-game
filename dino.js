import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperties.js";

const DINO_FRAME_COUNT = 2;
const JUMP_SPEED = .6;
const GRAVITY = 0.003;
const FRAME_TIME = 100;

const dinoElem = document.querySelector("[data-dino]");

//setupDino()
let currentFrameTime
let dinoFrameNo
let isJumping
let yVelocity

// to handle jump on space bar press
const onJump = (e) => {
    if(e.code !== 'Space' || isJumping === true ) {
        return;
    }
    yVelocity = JUMP_SPEED;
    isJumping = true;
}

export const setDinoLose = () => {
  dinoElem.src='./imgs/dino-lose.png';
}

export const getDinoRect = () => dinoElem.getBoundingClientRect();
export const handleRun = (delta, speedScale) => {
  //when dino jumps do not swap dino frames
  if (isJumping) {
    dinoElem.src = `./imgs/dino-stationary.png`;
    return;
  }
  //swap two dino frames so it feels like dino is actually running
  if (currentFrameTime > FRAME_TIME) {
    dinoFrameNo = (dinoFrameNo + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `./imgs/dino-run-${dinoFrameNo}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  // as the game progresses swapping speed increases(makes dino moves faster) 
  currentFrameTime += delta * speedScale;
};

export const handleJump = (delta) => {
  // if already jumping return
  if (!isJumping) {
    return;
  }
  // for jump animation
  incrementCustomProperty(dinoElem,'--bottom',yVelocity*delta);
  
  // makes sure dino does not go below ground
  if(getCustomProperty(dinoElem, '--bottom') <= 0 ) {
      setCustomProperty(dinoElem, '--bottom',0);
      isJumping = false;
  }
  // return to ground
  yVelocity -= delta * GRAVITY;
};


// initializes default properties of dino when game starts
export const setupDino = () => {
  dinoFrameNo = 0;
  isJumping = false;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem,"--bottom",0);
  document.removeEventListener('keydown',onJump);
  document.addEventListener('keydown',onJump);
  
};



export const updateDino = (delta, speedScale) => {
  handleRun(delta,speedScale);
  handleJump(delta);
};
