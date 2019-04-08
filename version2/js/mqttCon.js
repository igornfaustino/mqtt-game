var client = mqtt.connect("http://localhost:9001")
client.subscribe("game")

client.on("message", function (topic, payload) {
    const value = parseInt(payload.toString())
    console.log((!valueAboveThreshold && value >= threshold))
    if (!valueAboveThreshold && value >= threshold) {
        valueAboveThreshold = true;
        console.log(value)
        raiseBarbell()
    }

    if (value < threshold) {
        moveBarbell(value)
        valueAboveThreshold = false
    }
})