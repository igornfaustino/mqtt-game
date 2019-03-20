var hudText; // text to display game info
var score = 0; // the score

var threshold = 50
var valueAboveThreshold = false

window.onload = function () {
    document.getElementById("threshold").value = threshold;
};

function updateValues() {
    threshold = document.getElementById("threshold").value;
    console.log({rotateSpeed, threshold})
}