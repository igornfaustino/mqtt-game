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

var pull = false;
var shooting = false;
var pos;

// when the game preloads, graphic assets are loaded
function onPreload() {
    game.stage.backgroundColor = "#777"
    game.stage.disableVisibilityChange = true;
    game.load.image("bow", "assets/bow.png")
    game.load.image("arrow", "assets/arrow.png")
    game.load.image("target", "assets/target.png")
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
    game.scale.setUserScale(scale, scale, 0, 0)
    game.scale.updateLayout();

    button = game.add.button(
        game.width - 50,
        0,
        "reset",
        function reset() {
            score = 0;
            updateHud();
            releaseArrow();
        },
        this,
        0,
        1,
        2,
        3);

    button.scale.setTo(0.2, 0.2)

    // add target to the game
    target = game.add.sprite(game.world.centerX, game.world.centerY, "target")
    target.scale.setTo(0.15, 0.15)
    target.x = game.width / 2 - Math.sqrt(Math.pow(target.width, 2) + Math.pow(target.height, 2)) / 2 + 5;
    target.y = 0;

    // add bow to the game
    bow = game.add.sprite(game.world.centerX, game.world.centerY, "bow")
    bow.angle -= 44
    bow.scale.setTo(0.3, 0.3)
    bow.x = game.width / 2 - Math.sqrt(Math.pow(bow.width, 2) + Math.pow(bow.height, 2)) / 2;
    bow.y += 140

    arrow = game.add.sprite(game.world.centerX, game.world.centerY, "arrow")
    arrow.scale.setTo(0.3, 0.3)
    arrow.angle -= 44
    arrow.x = game.width / 2 - Math.sqrt(Math.pow(arrow.width, 2) + Math.pow(arrow.height, 2)) / 2;
    arrow.y += 80

    // create and place the text showing speed and score
    hudText = game.add.text(25, 0, "", {
        font: "50px Arial",
        fill: "#000",
        align: "center"
    });

    info = game.add.text(game.width / 2, game.height / 3, "", {
        font: "20px Arial",
        fill: "#000",
        align: "center"
    })

    resetInfo()

    initialPos = arrow.y
    // update text content
    updateHud();
}

function resetInfo() {
    info.text = "Puxe a flecha"
    info.x = game.width / 2 - info.width / 2
    info.setStyle({
        font: "20px Arial",
        fill: "#ee0",
        align: "center"
    })
}

function onUpdate() {
    if (shooting) {
        arrow.y -= 20
        info.text = "belo tiro"
        info.x = game.width / 2 - info.width / 2
        if (arrow.y <= 5) {
            score += 1
            arrow.y = initialPos
            shooting = false
            resetInfo()
            updateHud()
        }
    } else {
        if (arrow.y < pos) {
            arrow.y += 4
        } else if (arrow.y > pos) {
            arrow.y -= 4
        }
    }
}

function pullArrow(value) {
    shooting = false;
    if (value >= b_threshold && value <= u_threshold) {
        pos = initialPos + 80;
    } else {
        pos = getPos(value)
    }
}

function getPos(value) {
    return ((value * (initialPos + 80 - initialPos) / b_threshold) + initialPos)
}

function releaseArrow() {
    pull = false
    resetInfo()
}

function updateHud() {
    hudText.text = score
}


function fire() {
    shooting = true
    pull = false
}