
const elemLeft = document.getElementById("leftPalette");
console.log("elem: ", elemLeft);

const elemRight = document.getElementById("rightPalette");
console.log("elem: ", elemRight);
let palette_speed = 1;
let game_speed =4;
let a=30;
let b=-30;
let gravity=0.01;
let friction=0.1;
let width=70;
let max_angle_a = 0;
let max_angle_b = 0;
let game_on=false;
let counter_time = 0;


myLeftMove(30);
myRightMove(-30);

let elem_timer = document.getElementById("timer");


const  ball = document.getElementById("ball");
console.log("ball: ", ball);

window.addEventListener("keydown", (event_down) => {
    if (event_down.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event_down.key) {
      // Do something for "left arrow" key press.
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
                if (a===max_angle_a){
                    clearInterval(id_l);
                } else {
                    myLeftMove(a);
                    a--;
                    elemLeft.dataset.anglel=a.toString();
                }
            }
          break;
      // Do something for "right arrow" key press.
        case "ArrowRight":
            try {
                if (id_r){
                    clearInterval(id_r);
                }
            }
            catch(err){
                console.log("error!!")
            }
            id_r = setInterval(frameR, palette_speed);
            function frameR() {
                if (b===max_angle_b){
                    clearInterval(id_r);
                } else {
                    myRightMove(b);
                    b++;
                    elemRight.dataset.angler=b.toString();
                }
            }
          break;
      // Do something for "down arrow" key press.
        case "ArrowDown":
            let counter_time;
            if (game_on === false) {
                start_game();
                counter_time = display_time();
            }
          break;

        default:
          return; // Quit when this doesn't handle the key event.
      }
      // Cancel the default action to avoid it being handled twice
      event_down.preventDefault();
    }, true);


window.addEventListener("keyup", (eventup) => {
    if (eventup.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (eventup.key) {
        // Do something for "left arrow" key press.
        case "ArrowLeft":
            clearInterval(id_l);
            id_l = setInterval(frameL, palette_speed);
            function frameL() {
                if (a===30){
                    clearInterval(id_l);
                } else {
                    myLeftMove(a);
                    a++;
                    elemLeft.dataset.anglel=a.toString();
                }
            }
            break;
        case "Right": // IE/Edge specific value
        // Do something for "right arrow" key    press.
        case "ArrowRight":
            clearInterval(id_r);
            id_r = setInterval(frameR, palette_speed);
            function frameR() {
                if (b===-30){
                    clearInterval(id_r);
                    // myLeftMove(30);
                } else {
                    myRightMove(b);
                    b--;
                    elemRight.dataset.angler=b.toString();
                }
            }
            break;

        default:
            return; // Quit when this doesn't handle the key event.
        }
      // Cancel the default action to avoid it being handled twice
      eventup.preventDefault();
    }, true);


function myLeftMove(a) {
    elemLeft.style.setProperty('--angleL', 'rotate('+ a + 'deg)');
}

function myRightMove(b) {
    elemRight.style.setProperty('--angleR', 'rotate('+ b + 'deg)');
}

function rotateBall(alpha) {
    ball.style.setProperty('--angleBall', 'rotate('+ alpha + 'deg)');
}


function start_game() {
    remove_message();
    game_on = true;
    let id = null;
    const elem = document.getElementById("ball");
    rect = elem.getBoundingClientRect()
    let vector_x = vector_y = 1,
        pos_x = 100,
        pos_y = 100,
        ball_w = 70,
        vx = 1,
        vy = Math.floor(Math.random() * 1.2 ) + 1;


    id = setInterval(frame, game_speed); // game loop

    function frame() {
        if(pos_y>=450 && pos_x <=150+ball_w){
            if ((pos_x) <= (pos_y-450+35)){ // lower left corner
                vector_y = -vector_y;
                pos_y += vy*vector_y;
                frame();
            }
        }
        if(pos_y>=(450) && pos_x <=(800-width) && pos_x>(650)){
            if ((pos_x+width) >= (1250-(pos_y+width+20))){ // lower right corner
                console.log("lower right corner!!!")
                if (vector_y>0) {
                    vector_y = -vector_y;
                }
                pos_y += vy*vector_y;
                frame();
            }
        }
        if (pos_x >= 800-ball_w || pos_x <= 5) { //limits x (left and right)


            vector_x = -vector_x;
            if (vector_x>0){
                vx = 1.02*vx
            }
            vx=1;
            pos_x += vx*vector_x + 0.1;
            frame();

        } else if (pos_y <= 10) { // limits y top
            vy = 1;
            vector_y = -vector_y;
            pos_y += vy*vector_y + 0.1;

        } else if (pos_y >= 600 && pos_y <800) { // limits y bottom
            console.log("a= ", a);
            console.log("b= ",b);
            if (a===0 && (pos_x>150 && pos_x < (350))) { // contact with left palette
                vy=vy*1.01;
                vector_y = -vector_y;
                pos_y += vy*vector_y + .05;

            } else if (a>0 && (pos_x>150 && (pos_x < (350)))) { // missing left palette
                pos_y += vy*vector_y;
                elem.style.top = pos_y + "px";
                elem.style.left = pos_x + "px";
            }
            if (b===0 && (pos_x>450 && pos_x < (650))) { // contact with right palette
                vy=vy*1.01;
                vector_y = -vector_y;
                pos_y += vy*vector_y + .05;

            } else if (b<0 && (pos_x>450 && (pos_x < (650)))) { // missing left palette
                pos_y += vy*vector_y + .05;
                elem.style.top = pos_y + "px";
                elem.style.left = pos_x + "px";
            }
            pos_y += vy*vector_y;
            elem.style.top = pos_y + "px";
            elem.style.left = pos_x + "px";

        }  else if (pos_y >800) {  //ending the game
            game_on=false;
            clearInterval(id);
            clearInterval(myInterval);
            elem_timer.classList.remove('started');
            console.log("You lose!!");
            display_message ("End of game");
            display_message2 ("Your score is: "+counter_time);

        } else {
            if (vector_x>=0){
                pos_x += vx*vector_x - friction;
            } else {
                pos_x += vx*vector_x + friction ;

            }
            if (vector_y>=0){
                vy=vy+gravity
            } else {
                vy=vy-gravity
            }
            pos_y += vy*vector_y;
            elem.style.top = pos_y + "px";
            elem.style.left = pos_x + "px";
      }
    }
}


function remove_message() {
    const diplay_container = document.getElementById("body");
    const divWithClasExists = document.querySelectorAll("lose").length > 0;
    if (divWithClasExists) {
        diplay_container.removeChild("lose");
    }
}

function display_message(input_text) {
    const diplay_container = document.getElementById("body");
    var block_to_insert;
    block_to_insert = document.createElement( 'lose' );
    block_to_insert.innerHTML = input_text ;
    diplay_container.appendChild( block_to_insert );
    block_to_insert.classList.add("lose");
}


function display_message2(input_text) {
    const diplay_container = document.getElementById("body");
    var block_to_insert;
    block_to_insert = document.createElement( 'score' );
    block_to_insert.innerHTML = input_text ;
    diplay_container.appendChild( block_to_insert );
    block_to_insert.classList.add("score");
}


function display_time() {
    const diplay_container = document.getElementById("body");
    var block_to_insert;
    block_to_insert = document.createElement( 'timer' );
    diplay_container.appendChild( block_to_insert );
    block_to_insert.classList.add("timer");
    var start = Date.now();
    myInterval = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        counter_time = Math.floor(delta / 1000);
        elem_timer.setAttribute('value', (Math.floor(delta / 1000)+' sec'));
    }, 1000); // update about every second
    elem_timer.classList.add('started');
    return counter_time

}
