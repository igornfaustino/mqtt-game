
var scale = (1.82 * screen.height / 1080)

var game = new Phaser.Game(
    320, // width
    480, // height
    Phaser.AUTO, // render mode 
    "game", // where to put the screen... blank will put on the body
    {
        preload: onPreload,
        create: onCreate,
        update: onUpdate
    } // basic functions
);


// when the game preloads, graphic assets are loaded
function onPreload() {
    game.stage.disableVisibilityChange = true;
    game.load.image("ball", "assets/ball.png");
    game.load.image("deadly", "assets/deadly.png");
    game.load.image("coin", "assets/coin.png");
    game.load.image("arrow", "assets/arrow.png");
    game.load.image("feedback", "assets/ball_light.png");

    console.log("assets load with success...")
}

// on game is created
function onCreate() {
    game.world.setBounds(0, 0, game.width, game.height);

    // center and scale the stage
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(scale, scale, 0, 0)
    game.scale.updateLayout();

    // add ball to the world
    ball = game.add.sprite(game.world.centerX, game.world.centerY, "ball");
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;

    // add feedback
    feedback = game.add.sprite(game.world.centerX, game.world.centerY, "feedback");
    feedback.anchor.x = 0.5;
    feedback.anchor.y = 0.5;
    feedback.scale.setTo(0, 0)

    // ball starting speed
    ball.xSpeed = 0;
    ball.ySpeed = 0;

    // the rotating arrow, look at its x registration point
    arrow = game.add.sprite(game.world.centerX, game.world.centerY, "arrow");
    arrow.anchor.x = -1; // offset to put the arrow outside the ball
    arrow.anchor.y = 0.5;

    // place an enemy
    placeDeadly();

    // create and place a coin 
    coin = game.add.sprite(Math.random() * 400 + 40, Math.random() * 240 + 40, "coin");
    coin.anchor.x = 0.5;
    coin.anchor.y = 0.5;
    placeCoin();

    // create and place the text showing speed and score
    hudText = game.add.text(5, 0, "", {
        font: "11px Arial",
        fill: "#ffffff",
        align: "left"
    });

    // update text content
    updateHud();

    // listener for input down
    game.input.onDown.add(fire, this);
}

function onUpdate() {
    arrow.angle += rotateSpeed * rotateDirection;

    // update ball position according to its speed
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    feedback.x = ball.x;
    feedback.y = ball.y;

    // handle wall bounce
    wallBounce();

    // reduce ball speed using friction
    ball.xSpeed *= friction;
    ball.ySpeed *= friction;

    // update arrow position
    arrow.x = ball.x;
    arrow.y = ball.y;

    // if the player picked a coin, then update score and text, change coin position and add an enemy
    if (getDistance(ball, coin) < (ballRadius * 2) * (ballRadius * 2)) {
        score += 1;
        placeDeadly();
        placeCoin();
        updateHud();
    }

    // if the player hits an enemy, reset the score
    for (i = 0; i < deadlyArray.length; i++) {
        if (getDistance(ball, deadlyArray[i]) < (ballRadius * 2) * (ballRadius * 2)) {
            game.camera.shake(0.05, 100)
            score = 0;
            feedback.scale.setTo(0, 0)
            removeDeadly()
            placeDeadly()
            updateHud();
        }
    }
}

function placeDeadly() {
    // create a new enemy
    var deadly = game.add.sprite(0, 0, "deadly");
    deadly.anchor.x = 0.5; // offset to move the center of the object
    deadly.anchor.y = 0.5;

    // add enemy to the array
    deadlyArray.push(deadly);

    // assign it a random legal position
    do {
        var randomX = Math.random() * (game.width - 2 * ballRadius) + ballRadius;
        var randomY = Math.random() * (game.height - 2 * ballRadius) + ballRadius;
        deadlyArray[deadlyArray.length - 1].x = randomX;
        deadlyArray[deadlyArray.length - 1].y = randomY;
    } while (illegalDeadly())
}

function removeDeadly() {
    for (i = 0; i < deadlyArray.length; i++) {
        deadlyArray[i].kill()
    }
    deadlyArray = []
}

function getScale(value) {
    return (value / threshold)
}

function setFeedback(value) {
    let scale = getScale(value)
    scale = scale >= 1 ? 1 : scale
    feedback.scale.setTo(scale, scale)
}

function illegalDeadly() {
    // if the distance between the enemy and the ball is less than three times the radius, it's NOT legal
    if (getDistance(ball, deadlyArray[deadlyArray.length - 1]) < (ballRadius * 3) * (ballRadius * 3)) {
        return true;
    }

    // if the distance between the enemy and any other enemy is less than two times the radius, it's NOT legal
    for (i = 0; i < deadlyArray.length - 1; i++) {
        if (getDistance(deadlyArray[i], deadlyArray[deadlyArray.length - 1]) < (ballRadius * 2) * (ballRadius * 2)) {
            return true
        }
    }

    // otherwise it's legal	
    return false;
}

// the function to place a coin is similar to the one which places the enemy, but this time we don't need
// to place it in an array because there's only one coin on the stage
function placeCoin() {

    // assign the coin a random position until such position is legal
    do {
        coin.x = Math.random() * (game.width - 2 * ballRadius) + ballRadius;
        coin.y = Math.random() * (game.height - 2 * ballRadius) + ballRadius;
    } while (illegalCoin());
}

// determine if a coin position is illegal
function illegalCoin() {

    // if the distance between the coin and any ball is less than 2.5 times the radius, it's NOT legal
    if (getDistance(ball, coin) < (ballRadius * 2.5) * (ballRadius * 2.5)) {
        return true;
    }

    // if the distance between the coin and any enemy is less than three times the radius, it's NOT legal
    for (i = 0; i < deadlyArray.length; i++) {
        if (getDistance(deadlyArray[i], coin) < (ballRadius * 3) * (ballRadius * 3)) {
            return true
        }
    }

    // otherwise it's legal
    return false;
}

function wallBounce() {
    if (ball.x < ballRadius) {
        ball.x = ballRadius;
        ball.xSpeed *= -1
    }
    if (ball.y < ballRadius) {
        ball.y = ballRadius;
        ball.ySpeed *= -1
    }
    if (ball.x > game.width - ballRadius) {
        ball.x = game.width - ballRadius;
        ball.xSpeed *= -1
    }
    if (ball.y > game.height - ballRadius) {
        ball.y = game.height - ballRadius;
        ball.ySpeed *= -1
    }
}

// simple function to get the distance between two sprites
// does not use sqrt to save CPU
function getDistance(from, to) {
    var xDist = from.x - to.x
    var yDist = from.y - to.y;
    return xDist * xDist + yDist * yDist;
}

function updateHud() {
    hudText.text = "Score: " + score
}


function fire() {
    ball.xSpeed += Math.cos(arrow.angle * degToRad) * power / 20;
    ball.ySpeed += Math.sin(arrow.angle * degToRad) * power / 20;
    rotateDirection *= -1;
}