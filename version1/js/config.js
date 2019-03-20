var ball; // the ball! Our hero
var arrow; // rotating arrow 
var rotateDirection = 1; // rotate direction: 1-clockwise, 2-counterclockwise
var power = 0; // power to fire the ball
var hudText; // text to display game info
var degToRad = 0.0174532925; // degrees-radians conversion
var score = 0; // the score
var coin; // the coin you have to collect
var deadlyArray = []; // an array which will be filled with enemies
var gameOver = false; // flag to know if the game is over

// these settings can be modified to change gameplay
var friction = 0.99; // friction affects ball speed
var ballRadius = 10; // radius of all elements
var rotateSpeed = 3; // arrow rotation speed
var power = 50; // power applied to ball

// EDIT THIS TO CHANGE THE WS URL
var url = "http://localhost:9001"

var threshold = 50
var valueAboveThreshold = false

window.onload = function () {
    document.getElementById("speed").value = rotateSpeed;
    document.getElementById("threshold").value = threshold;
};

function updateValues() {
    rotateSpeed = document.getElementById("speed").value;
    threshold = document.getElementById("threshold").value;

    console.log({rotateSpeed, threshold})
}