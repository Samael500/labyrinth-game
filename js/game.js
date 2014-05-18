var canvas;
var context;

var unitImg;

var currUnitX = 0;
var currUnitY = 0;
var unitStep = 10;
var unitSize = 50;

var unitSrc = "img/mario.png";


var background_color = "lightgrey";

function make_white(x, y, w, h, style) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}

function load_unit() {
    unitImg = new Image();
    unitImg.onload = function () {
        context.drawImage(unitImg, currUnitX, currUnitY, unitSize, unitSize);
    };
    unitImg.src = unitSrc;
}

function draw_unit(posX, posY, color) {
    make_white(currUnitX, currUnitY, unitSize, unitSize, background_color);

    // console.log(unitImg);
    context.drawImage(unitImg, posX, posY, unitSize, unitSize);
    // makeWhite(currRectX, currRectY, 15, 15);
    // currRectX = x;
    // currRectY = y;
    // context.beginPath();
    // context.rect(x, y, 15, 15);
    // context.closePath();
    // context.fillStyle = style;
    // context.fill();
}

function can_move_to(x, y) {
    if (x >=0 && (x <= canvas.width - unitSize) && y >=0 && (y <= canvas.height -unitSize) )
        return true;
    return false;
}

function move_unit(e) {
    var newX;
    var newY;
    var movingAllowed = false;
    e = e || window.event;
    console.log(e.keyCode);
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


$( document ).ready(function() {

    canvas = document.getElementById("labyrinth-game");
    context = canvas.getContext("2d");
    
    load_unit();
    window.addEventListener("keydown", move_unit, true);
});


// $( document ).ready(function() {

        // // 425 (X), 3 (Y) RECTANGLE
        // // 542 (center X), 122 (center Y) CIRCLE
        // var canvas = document.getElementById("labyrinth-game");
        // var context = canvas.getContext("2d");
        // var currRectX = 425;
        // var currRectY = 3;
        // var mazeWidth = 556;
        // var mazeHeight = 556;
        // var intervalVar;
        // function drawMazeAndRectangle(rectX, rectY) {
        //     makeWhite(0, 0, canvas.width, canvas.height);
        //     var mazeImg = new Image();
        //     mazeImg.onload = function () {
        //         context.drawImage(mazeImg, 0, 0);
        //         drawRectangle(rectX, rectY, "#0000FF");
        //         context.beginPath();
        //         context.arc(542, 122, 7, 0, 2 * Math.PI, false);
        //         context.closePath();
        //         context.fillStyle = '#00FF00';
        //         context.fill();
        //     };
        //     mazeImg.src = "http://users.skynet.be/fb298422/ProgramFOX/HTML5/Maze/maze.gif";
        // }
        // function drawRectangle(x, y, style) {
        //     makeWhite(currRectX, currRectY, 15, 15);
        //     currRectX = x;
        //     currRectY = y;
        //     context.beginPath();
        //     context.rect(x, y, 15, 15);
        //     context.closePath();
        //     context.fillStyle = style;
        //     context.fill();
        // }
        // function moveRect(e) {
        //     var newX;
        //     var newY;
        //     var movingAllowed;
        //     e = e || window.event;
        //     switch (e.keyCode) {
        //         case 38:   // arrow up key
        //         case 87: // W key
        //             newX = currRectX;
        //             newY = currRectY - 3;
        //             break;
        //         case 37: // arrow left key
        //         case 65: // A key
        //             newX = currRectX - 3;
        //             newY = currRectY;
        //             break;
        //         case 40: // arrow down key
        //         case 83: // S key
        //             newX = currRectX;
        //             newY = currRectY + 3;
        //             break;
        //         case 39: // arrow right key
        //         case 68: // D key
        //             newX = currRectX + 3;
        //             newY = currRectY;
        //             break;
        //     }
        //     movingAllowed = canMoveTo(newX, newY);
        //     if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
        //         drawRectangle(newX, newY, "#0000FF");
        //         currRectX = newX;
        //         currRectY = newY;
        //     }
        //     else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
        //         clearInterval(intervalVar);
        //         makeWhite(0, 0, canvas.width, canvas.height);
        //         context.font = "40px Arial";
        //         context.fillStyle = "blue";
        //         context.textAlign = "center";
        //         context.textBaseline = "middle";
        //         context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
        //         window.removeEventListener("keydown", moveRect, true);
        //     }
        // }
        // function canMoveTo(destX, destY) {
        //     var imgData = context.getImageData(destX, destY, 15, 15);
        //     var data = imgData.data;
        //     var canMove = 1; // 1 means: the rectangle can move
        //     if (destX >= 0 && destX <= mazeWidth - 15 && destY >= 0 && destY <= mazeHeight - 15) {
        //         for (var i = 0; i < 4 * 15 * 15; i += 4) {
        //             if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
        //                 canMove = 0; // 0 means: the rectangle can't move
        //                 break;
        //             }
        //             else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
        //                 canMove = 2; // 2 means: the end point is reached
        //                 break;
        //             }
        //         }
        //     }
        //     else {
        //         canMove = 0;
        //     }
        //     return canMove;
        // }
        // function createTimer(seconds) {
        //     intervalVar = setInterval(function () {
        //         makeWhite(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
        //         if (seconds === 0) {
        //             clearInterval(intervalVar);
        //             window.removeEventListener("keydown", moveRect, true);
        //             makeWhite(0, 0, canvas.width, canvas.height);
        //             context.font = "40px Arial";
        //             context.fillStyle = "red";
        //             context.textAlign = "center";
        //             context.textBaseline = "middle";
        //             context.fillText("Time's up!", canvas.width / 2, canvas.height / 2);
        //             return;
        //         }
        //         context.font = "20px Arial";
        //         if (seconds <= 10 && seconds > 5) {
        //             context.fillStyle = "orangered";
        //         }
        //         else if (seconds <= 5) {
        //             context.fillStyle = "red";
        //         }
        //         else {
        //             context.fillStyle = "green";
        //         }
        //         context.textAlign = "center";
        //         context.textBaseline = "middle";
        //         var minutes = Math.floor(seconds / 60);
        //         var secondsToShow = (seconds - minutes * 60).toString();
        //         if (secondsToShow.length === 1) {
        //             secondsToShow = "0" + secondsToShow; // if the number of seconds is '5' for example, make sure that it is shown as '05'
        //         }
        //         context.fillText(minutes.toString() + ":" + secondsToShow, mazeWidth + 30, canvas.height / 2);
        //         seconds--;
        //     }, 1000);
        // }
        // function makeWhite(x, y, w, h) {
        //     context.beginPath();
        //     context.rect(x, y, w, h);
        //     context.closePath();
        //     context.fillStyle = "white";
        //     context.fill();
        // }
        // drawMazeAndRectangle(425, 3);
        // window.addEventListener("keydown", moveRect, true);
        // createTimer(120); // 2 minutes

// });
