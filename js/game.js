
// const elem = document.getElementById("animate");
const elemLeft = document.getElementById("leftPalette");
console.log("elem: ", elemLeft);

const elemRight = document.getElementById("rightPalette");
console.log("elem: ", elemRight);
let palette_speed = 1,
    game_speed = 5,
    a=0,
    b=0.
    gravity=0.01,
    friction=0.1,
    width=70;
myLeftMove(30);
myRightMove(-30);

const  ball = document.getElementById("ball");
console.log("ball: ", ball);

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
        case "ArrowDown":
            start_game();
          // Do something for "down arrow" key press.
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

function start_game() {
    let id = null;
    const elem = document.getElementById("ball");
    rect = elem.getBoundingClientRect()
    // const container = document.getElementById("display_box");
    // container.innerHTML = ''; 
    // let pos_x = rect['x'];
    // let pos_y = rect['y'];
    let vector_x = vector_y = 1,
        pos_x = pos_y = 100,
        ball_w = 70,
        vx = 1,
        vy = 1;

    // clearInterval(id);
    id = setInterval(frame, game_speed); // game loop
    function frame() {
        update();
        if(pos_y>=450 && pos_x <=150){
            if ((pos_x) <= (pos_y-400)){ // lower left corner
                console.log("lower left corner!!!")
                vx=1.01*vx;
                vector_x = -vector_x;
                vector_y = -vector_y;
                pos_x += vx*vector_x;
                pos_y += vy*vector_y; 
                frame();
            }
            // vector_y = - vector_y
        } 
        // if(pos_y>=(450-width) && pos_x <=(800-width) && pos_x>(650-width)){
            if(pos_y>=(450) && pos_x <=(800-width) && pos_x>(650)){
            // if ((pos_x+width) >= (1250-(pos_y+width))){ // lower right corner
            if ((pos_x+width) >= (1250-(pos_y+width+20))){ // lower right corner
            // if ((pos_x-650-70) >= (pos_y-400)){ // lower right corner
                console.log("lower right corner!!!")
                vx=1.01*vx;
                // vector_x = -vector_x;
                vector_y = -vector_y;
                pos_x += vx*vector_x;
                pos_y += vy*vector_y; 
                frame();
            }
            // vector_y = - vector_y
        } 
        if (pos_x >= 10+800-ball_w || pos_x <= 5) { //limits x (left and right)
            // clearInterval(id);
            vx=1;
            vector_x = -vector_x;
            // vector_y = -vector_y;
            pos_x += vx*vector_x;
            frame();        
        } else if (pos_y <= 10+ball_w || pos_y >= 600) { // limits y top & bottom
            // vector_x = -vector_x;
            vector_y = -vector_y;
            // if (vector_y>0){
            //     vy=1.1*vy
            // } else {
            //     vy=1
            // }
            pos_y += vy*vector_y; 
        } else {
       

        if (vector_x>=0){
            pos_x += vx*vector_x - friction;
        } else {
            pos_x += vx*vector_x + friction ;

        }
        // pos_x += (vx-friction)*vector_x;

        if (vector_y>=0){
            vy=vy+gravity
        } else {
            vy=vy-gravity
        }
        pos_y += vy*vector_y + .05; 
        elem.style.top = pos_y + "px"; 
        elem.style.left = pos_x + "px"; 
      }
    }


}



function update(id) {
    const elem = document.getElementById("ball");
    rect = elem.getBoundingClientRect()
    const container = document.getElementById("display_box");
    container.innerHTML = '';  
    for (const key in rect) {
        if (typeof rect[key] !== 'function') {
          let para = document.createElement('p');
          para.textContent = `${key} : ${rect[key]}`;
          container.appendChild(para);
        }
      }
}

