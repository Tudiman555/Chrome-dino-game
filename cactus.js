import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperties.js";

// should be same as Ground
const CACTUS_SPEED = 0.05;
// Time after which Cactus will appear on screen
const MIN_CACTUS_SPAWN_TIME = 1000;
const MAX_CACTUS_SPAWN_TIME = 3000;

// generates a random value between two values

const worldElem = document.querySelector("[data-world]");
const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let spawnTime;

export const getCactusRects = () => {
    const cactusElems = document.querySelectorAll("[data-cactus]");
    return [...cactusElems].map(cactus => cactus.getBoundingClientRect());
}

export const setupCactus = () => {
  spawnTime = MIN_CACTUS_SPAWN_TIME;
  const cactusElems = document.querySelectorAll("[data-cactus]");
  cactusElems.forEach((cactus) => {
    // remove the cactus when game restarts

    cactus.remove();
  });
};

const spawnCactus = () => {
  // create cactus
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.classList.add("cactus");
  cactus.src = './imgs/cactus.png';
  // cactus should should spawn at the right end of the screen
  setCustomProperty(cactus, "--left", 100);

  // append to the world
  worldElem.appendChild(cactus);
};

export const updateCactus = (delta, speedScale) => {
  const cactusElems = document.querySelectorAll("[data-cactus]");
  cactusElems.forEach((cactus) => {
    // same as ground
    incrementCustomProperty(
      cactus,
      "--left",
      speedScale * delta * CACTUS_SPEED * -1
    );

    // remove the cactus once its beyond the screen
    if (getCustomProperty(cactus, "--left") < -5) {
      cactus.remove();
    }
  });
  if (spawnTime <= 0) {
    spawnCactus();
    spawnTime = randomNumberBetween(
      MIN_CACTUS_SPAWN_TIME,
      MAX_CACTUS_SPAWN_TIME
    )/speedScale;
  }
  spawnTime -= delta * speedScale;
};
