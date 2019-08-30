const express = require('express')
var bodyParser = require('body-parser')
var request = require('request');
const app = express()
const port = 3000
var weatherData = {}

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/weather/current/:lat/:lng', function (req, res) {

lat = req.params.lat
lng = req.params.lng

    request.get(`https://api.darksky.net/forecast/2863177e8cb7681e2d21b3595b571989/${lat},${lng}`, function(err, response, body) {

    weatherData = JSON.parse(body) //had to parse to a json, this part did my head in
    //Creating Json object
    var weather = {}
 
        //make weatherData json within the HTTP GET
        weather = 
        {
            "latitude": weatherData.latitude,
            "longitude": weatherData.longitude,
            "timezone": weatherData.timezone,
            "summary": weatherData.currently.summary,
            "temperature": weatherData.currently.temperature,
            "apparentTemperature": weatherData.currently.apparentTemperature,
            "temperatureHigh": weatherData.currently.temperatureHigh,
            "temperatureLow": weatherData.currently.temperatureLow,
            "windSpeed": weatherData.currently.windSpeed 
        }

        res.send(weather)
});

  })
app.listen(port, () => console.log(`Listening on port ${port}!`))