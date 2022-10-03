function myMove() {
    let id = null;
    const elem = document.getElementById("animate");
    // const elem = document.getElementById("circle");
    let pos, pos_x , pos_y = 0;
    let sign = 1;
    // clearInterval(id);
    elem.style.top = 350 + 'px';
    elem.style.left = 350 + 'px';
    elem.classList.add('rotated');
    // id = setInterval(frame, 5);

    // function frame() {  diagonal animation
    //   if (pos == 350 || pos < 0) {
    //     // clearInterval(id);
    //     sign = sign*(-1);
    //     pos+=sign;
    //     elem.classList.toggle('rotated')
    //     frame();
    //   } else {
    //     pos += sign;
    //     elem.style.top = pos + 'px';
    //     elem.style.left = pos + 'px';
    //   }
    // }
    function frame() {
        
    }
}

function myMoveBack() {
    let id = null;
    const elem = document.getElementById("animate");
    // const elem = document.getElementById("circle");
    let pos, pos_x , pos_y = 0;
    let sign = 1;
    // clearInterval(id);
    elem.style.top = 350 + 'px';
    elem.style.left = 350 + 'px';
    elem.classList.remove('rotated')
}