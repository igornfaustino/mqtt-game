var client = mqtt.connect(url)
client.subscribe("game")

client.on("message", function (topic, payload) {
    const value = parseInt(payload.toString())
    console.log((!valueAboveThreshold && value >= threshold))
    if (!valueAboveThreshold && value >= threshold) {
        valueAboveThreshold = true;
        console.log(value)
        fire();
    }

    valueAboveThreshold = (valueAboveThreshold && value < threshold) ? false : true
})