
// const elem = document.getElementById("animate");
const elemLeft = document.getElementById("leftPalette");
console.log("elem: ", elemLeft);

const elemRight = document.getElementById("rightPalette");
console.log("elem: ", elemRight);
let palette_speed = 1;
let a=0;
let b=0;
myLeftMove(30);
myRightMove(-30);

window.addEventListener("keydown", (eventdown) => {
    if (eventdown.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }   
    switch (eventdown.key) {
        case "ArrowLeft":
            try {
                if (id_l){
                    clearInterval(id_l);
                }
            }
            catch(err){
                console.log("initial erorr!!")
            }
            id_l = setInterval(frameL, palette_speed);
            console.log("id_l: ", id_l)
            function frameL() {
                if (a==-45){
                    clearInterval(id_l);
                    // myLeftMove(45);
                } else {
                    myLeftMove(a);
                    a--;
                    elemLeft.dataset.anglel=a;
                }
            // myLeftMove(-45);
            }
          // Do something for "left arrow" key press.
          break;
        case "ArrowRight":
            try {
                if (id_r){
                    clearInterval(id_r);
                }
            }
            catch(err){
                console.log("erorr!!")
            }
            id_r = setInterval(frameR, palette_speed);
            function frameR() {
                if (b==45){
                    clearInterval(id_r);
                    // myLeftMove(45);
                } else {
                    myRightMove(b);
                    b++;
                    elemRight.dataset.angler=b;
                }
            // myRightMove();
          // Do something for "right arrow" key press.
            }
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      // Cancel the default action to avoid it being handled twice
      eventdown.preventDefault();
    }, true);    


window.addEventListener("keyup", (eventup) => {
    if (eventup.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }    
    switch (eventup.key) {
        case "ArrowLeft":
            clearInterval(id_l);
            id_l = setInterval(frameL, palette_speed);
            function frameL() {
                if (a==30){
                    clearInterval(id_l);
                    // myLeftMove(30);
                } else {
                    myLeftMove(a);
                    a++;
                    elemLeft.dataset.anglel=a;
                }
            // myLeftMove(-45);
            }
            // Do something for "left arrow" key press.
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            clearInterval(id_r);
            id_r = setInterval(frameR, palette_speed);
            function frameR() {
                if (b==-30){
                    clearInterval(id_r);
                    // myLeftMove(30);
                } else {
                    myRightMove(b);
                    b--;
                    elemRight.dataset.angler=b;
                }
            // myLeftMove(-45);
            }

            // myRightMoveBack();
            // Do something for "right arrow" key press.
            break;

        default:
            return; // Quit when this doesn't handle the key event.
        }        
      // Cancel the default action to avoid it being handled twice
      eventup.preventDefault();
    }, true);

function myLeftMove(a) {
    elemLeft.style.setProperty('--angleL', 'rotate('+ a + 'deg)');

    // transform: rotate(-45deg)
}

// function myLeftMoveBack() {
//     elemLeft.classList.replace('rotatedLeft', 'rotatedIniLeft')
// }

function myRightMove(b) {
    // elemRight.classList.replace('rotatedIniRight', 'rotatedRight');
    elemRight.style.setProperty('--angleR', 'rotate('+ b + 'deg)');
}

// function myRightMoveBack() {
//     elemRight.classList.replace('rotatedRight', 'rotatedIniRight')
    
// }