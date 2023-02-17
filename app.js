const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const chosenCity = req.body.cityName
    const apiKey = "7568e3a62a1e681e697b7545db8d197d"
    const unit = "metric" 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + apiKey + "&units=" + unit

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelsLike = weatherData.main.feels_like
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png"
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<h1>Current temperature in " + chosenCity + " is " + temp + " degrees Celcius.</h1>")
            res.write("<br>However, the temperature feels like " + feelsLike + " degrees Celcius.")
            res.write("<br>The description of the current weather is: " + weatherDescription + ".")
            res.write("<br><img src=" + imageURL +">");
            res.end()
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000.")
})