var canvas;
var context;

var canvas_background;
var context_background;
var background_data;

var img_data;

var unitImg;
var mapImg;

var mapData;

var unitGhost;

var currUnitX = 10;
var currUnitY = 10;
var unitStep = 10;
var unitSizeW = 30;
var unitSizeH = 40;

var unitSrc = "img/mario.png";
var mapSrc = "img/map2.png";

var background_color = "lightgrey";

function make_white(x, y, w, h, style) {
    // context.drawImage(mapImg, 0, 0);
    // var back_data = context_background.getImageData(x, y, w, h);
    // context.putImageData(back_data, x, y);
    context.drawImage(mapImg, 0, 0);
    // context.putImageData(background_data, 0, 0);

    // context.beginPath();
    // context.rect(x, y, w, h);
    // context.closePath();
    // context.fillStyle = style;
    // context.fill();
}

function get_unit_pos(X, Y){
    var x = X + unitSizeW / 2;
    var y = Y + unitSizeH - unitStep;
    return (canvas_background.width * y + x) * 4;
}

function load_images() {
    unitImg = new Image();
    mapImg = new Image();

    unitImg.onload = function () {
        context.drawImage(unitImg, currUnitX, currUnitY, unitSizeW, unitSizeH);
    };
    mapImg.onload = function () {
        context.drawImage(mapImg, 0, 0);
        context_background.drawImage(mapImg, 0, 0);
        background_data = context_background.getImageData(0, 0, canvas_background.width, canvas_background.height);
        img_data = background_data.data;
        // drawImage(mapImg, 0, 0);
        // mapData = context.getImageData(0, 0, canvas.width, canvas.height);
        // get_unit_ghost();
    };

    mapImg.src = mapSrc;
    unitImg.src = unitSrc;


//    console.log(context.getImageData(10, 10, 15, 15))
}

function draw_unit(posX, posY, color) {
    make_white(currUnitX, currUnitY, unitSizeW, unitSizeH, background_color);
    context.drawImage(unitImg, posX, posY, unitSizeW, unitSizeH);
}

function can_move_to(x, y) {
    // check available move as size of maze
    if (x >=0 && (x <= canvas.width - unitSizeW) && y >=0 && (y <= canvas.height - unitSizeH) ) {
        // check available move as image color
        var start = get_unit_pos(x, y);
        // for(var i = start; i <= start + 4; i += 4) {
        //     var red = img_data[i];
        //     var green = img_data[i + 1];
        //     var blue = img_data[i + 2];
        //     var alpha = img_data[i + 3];
        //     // console.log(red, green, blue, alpha);
        //     if (red !== 255 && green !== 255 && blue !== 255) {
        //         // console.log('no');
        //         return false;
        //     }
        // }

        // console.log('ok');
        return true;
    }
    return false;
}

function move_unit(e) {
    var newX;
    var newY;
    var movingAllowed = false;
    e = e || window.event;
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 38:  // arrow up key
        case 87:  // W key
            newX = currUnitX;
            newY = currUnitY - unitStep;
            break;
        case 37:  // arrow left key
        case 65:  // A key
            newX = currUnitX - unitStep;
            newY = currUnitY;
            break;
        case 40:  // arrow down key
        case 83:  // S key
            newX = currUnitX;
            newY = currUnitY + unitStep;
            break;
        case 39:  // arrow right key
        case 68:  // D key
            newX = currUnitX + unitStep;
            newY = currUnitY;
            break;
    }

    movingAllowed = can_move_to(newX, newY);

    if (movingAllowed === true) {
        draw_unit(newX, newY, "#0000FF");
        currUnitX = newX;
        currUnitY = newY;
    }
        // else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
        //     // clearInterval(intervalVar);
        //     // makeWhite(0, 0, canvas.width, canvas.height);
        //     // context.font = "40px Arial";
        //     // context.fillStyle = "blue";
        //     // context.textAlign = "center";
        //     // context.textBaseline = "middle";
        //     // context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
        //     // window.removeEventListener("keydown", moveRect, true);
        // }
}

function start_game() {
    canvas = document.getElementById("labyrinth-game");
    context = canvas.getContext("2d");

    canvas_background = document.createElement('canvas');
    canvas_background.width = canvas.width;
    canvas_background.height = canvas.height;
    context_background = canvas_background.getContext("2d");
    
    load_images();
    window.addEventListener("keydown", move_unit, true);
}

$( document ).ready(function() {
    start_game();
});
