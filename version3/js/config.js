var hudText; // text to display game info
var info;
var score = 0; // the score

var b_threshold = 50
var u_threshold = 75
var time = 3
var pkgPerSec = 500
var valueAboveThreshold = false

window.onload = function () {
    document.getElementById("b_threshold").value = b_threshold;
    document.getElementById("u_threshold").value = u_threshold;
    document.getElementById("time").value = time;
    document.getElementById("pkgPerSec").value = pkgPerSec;
};

function updateValues() {
    b_threshold = document.getElementById("b_threshold").value;
    u_threshold = document.getElementById("u_threshold").value;
    time = document.getElementById("time").value;
    pkgPerSec = document.getElementById("pkgPerSec").value;
    console.log({b_threshold, u_threshold, time, pkgPerSec})
}