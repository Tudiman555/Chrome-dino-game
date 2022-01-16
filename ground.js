import { setCustomProperty, getCustomProperty,incrementCustomProperty } from "./updateCustomProperties.js";

// fetching the ground elements(img)

const GROUND_SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");
/* this will setup both ground elements one after another
Note : Length of Ground is 300 units
*/
export const setupGround = () => {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
};

/* to perform ground moving animation.
As the Game Starts to progress speed will be Incremented
-1 is used to make ground move backwards
*/
export const updateGround = (delta, speedScale) => {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * -1 * speedScale* GROUND_SPEED);

    // to check whether a ground element is moved completely of the screen
    if(getCustomProperty(ground,'--left') < -300 ) {
        // ground1(-300,0) ground2(0,300) ground1(300,600)
        setCustomProperty(ground,'--left',300);
    }
  });
};
