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
    request.get('https://api.darksky.net/forecast/2863177e8cb7681e2d21b3595b571989/42.3601,-71.0589', function(err, response, body) {
        
        const jsonString = JSON.stringify(req.body)
    //console.log(jsonString)
    weatherData = JSON.parse(body) //had to parse to a json, this part did my head in
});
    var weather = {}
    weather = 
        {
            "latitude": weatherData.latitude,
            "longitude": weatherData.longitude,
            "timezone": weatherData.timezone,
            "summary": weatherData.currently.summary
           /* "temperature": weatherData.currently.tempreature,
            "apparentTemperature": weatherData.currently.apparentTemperature,
            "temperatureHigh": weatherData.currently.temperatureHigh,
            "temperatureLow": weatherData.currently.temperatureLow,
            "windSpeed": weatherData.currently.windSpeed */
        } 
        //make weatherData json within the HTTP GET
   res.send(weather)
    
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))