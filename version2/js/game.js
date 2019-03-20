
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

var moveUp = false;
var moveDown = true;


// when the game preloads, graphic assets are loaded
function onPreload() {
    game.stage.backgroundColor = "#fff"
    game.stage.disableVisibilityChange = true;
    game.load.image("barbell", "assets/barbell.png")
    game.load.image("line", "assets/black-dotted-line.png")
    game.load.image("reset", "assets/reset.png");

    console.log("assets load with success...")
}

// on game is created
function onCreate() {
    game.world.setBounds(0, 0, game.width, game.height);

    // center and scale the stage
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(1.9, 1.9, 0, 0)
    game.scale.updateLayout();

    button = game.add.button(
        game.width - 50,
        0,
        "reset",
        function reset() {
            score = 0;
            updateHud();
            releaseBarbell()
        },
        this,
        0,
        1,
        2,
        3);
    
    button.scale.setTo(0.2, 0.2)

    // add barbell to the game
    barbell = game.add.sprite(game.world.centerX, game.world.centerY, "barbell")
    barbell.scale.setTo(0.3, 0.3)
    barbell.x = game.width / 2 - barbell.width / 2;


    // add line to the game
    line = game.add.sprite(0, 0, "line")
    line.scale.setTo(0.2, 0.2)
    line.x = game.width / 2 - line.width / 2 + 25;
    line.y = 180


    // create and place the text showing speed and score
    hudText = game.add.text(25, 0, "", {
        font: "50px Arial",
        fill: "#000",
        align: "center  "
    });

    floor = barbell.y
    topPosition = line.y - barbell.height / 2

    // update text content
    updateHud();
}

function onUpdate() {
    if (moveDown && barbell.y < floor) {
        barbell.y += 4
    } else if (moveUp && barbell.y > topPosition) {
        barbell.y -= 4
    }
}

function raiseBarbell() {
    moveUp = true;
    moveDown = false
    score++;
    updateHud();
}

function releaseBarbell() {
    moveUp = false;
    moveDown = true;
}

function updateHud() {
    hudText.text = score
}


function fire() {
    ball.xSpeed += Math.cos(arrow.angle * degToRad) * power / 20;
    ball.ySpeed += Math.sin(arrow.angle * degToRad) * power / 20;
    updateHud();
    rotateDirection *= -1;
}