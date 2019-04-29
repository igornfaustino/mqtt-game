var client = mqtt.connect(url)
client.subscribe("game")

var count = 0
var timePass = 0

client.on("message", function (topic, payload) {
    const value = parseInt(payload.toString())
    console.log(value)
    if (!shooting) {
        pullArrow(value)
        if (value >= b_threshold && value <= u_threshold) {
            count++;
            if (count == pkgPerSec) {
                timePass++;
                count = 0
            }

            info.text = "Mantenha esta força por " + parseInt(time - timePass).toString() + " s"
            info.x = game.width / 2 - info.width / 2
            info.setStyle({
                font: "20px Arial",
                fill: "#0e0",
                align: "center"
            })

            if ((time - timePass) == 0) {
                fire()
                count = 0
                timePass = 0
            }
        } else if (value > u_threshold) {
            info.text = "Muito forte"
            info.x = game.width / 2 - info.width / 2
            info.setStyle({
                font: "20px Arial",
                fill: "#e00",
                align: "center"
            })
            count = 0
            timePass = 0
        } else {
            resetInfo()
            count = 0
            timePass = 0
        }
    }
})