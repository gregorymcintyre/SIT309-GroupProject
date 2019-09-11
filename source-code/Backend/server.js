const express = require('express')
var bodyParser = require('body-parser')
var request = require('request');
var d2d = require('degrees-to-direction');
const app = express()
const port = 3000;
const cors = require('cors');
var weatherData = {}
function convertDate(start, end) {
  var convert =
  {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tesuday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Sunday"
  }
  if (start == end) {
    return "Only on " + convert[start];
  }
  else {
    return convert[start] + " to " + convert[end];
  }
}
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/weather/current/:lat/:lng', function (req, res) { //Retreive current weather information for lat and long

  lat = req.params.lat
  lng = req.params.lng
  var d = (new Date).getTime();

  request.get(`
    https://api.darksky.net/forecast/2863177e8cb7681e2d21b3595b571989/${lat},${lng}?exclude=minutely,hourly,alerts,flags&units=si
  `, function (err, response, body) {
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
        "temperatureHigh": weatherData.daily.data[0].temperatureHigh,
        "temperatureLow": weatherData.daily.data[0].temperatureLow,
        "windBearing": d2d(weatherData.daily.data[0].windBearing),
        "icon": weatherData.daily.data[0].icon,
        "uvIndex": weatherData.daily.data[0].uvIndex,
        "humidity": weatherData.daily.data[0].humidity,
        "time": d,
        "windSpeed": weatherData.currently.windSpeed
      }

    res.send(weather)
  });

})
app.get('/parking/:lat/:lng', function (req, res) {

  lat = req.params.lat
  lng = req.params.lng
  var result = {}
  var restriction = {}
  request.get(`https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?lat=${lat}&lon=${lng}`, function (err, response, body) {
    result = JSON.parse(body)
    request.get(`https://data.melbourne.vic.gov.au/resource/ntht-5rk7.json?BayID=${result[0].bay_id}`, function (err, response, body) {
      restriction = JSON.parse(body)

      function calculateDays(start, end) {
        var days = []
        var i;
        for (i = start; i <= end; i++) {
          days.push(parseInt(i))
        }
        return days;
      }
      function isFree(str) {
        var result = str.includes("Meter");
        return result;
      }

      result = {
        bay_id: result[0].bay_id,
        location: {
          lattitude: result[0].location.latitude,
          longitude: result[0].location.longitude,
        },
        status: result[0].status,
        restrictions: []
      }

      for (var i = 1; i <= 6; i++) {
        if (restriction[0]['typedesc' + i]) {
          result.restrictions.push({
            "isFree": isFree(restriction[0]['typedesc' + i]),
            "duration": { "normal": restriction[0]['duration' + i], "disablity": restriction[0]['disabilityext' + i] },
            "effectiveonph": restriction[0]['effectiveonph' + i],
            "time": { "start": restriction[0]['starttime' + i], "end": restriction[0]['endtime' + i] },
            "days": calculateDays(restriction[0]['fromday' + i], restriction[0]['today' + i]),
            "daysTranslated": convertDate(restriction[0]['fromday' + i],restriction[0]['today' + i])
          });
        }
      }
      res.send(result)
    })
  })




})

app.listen(port, () => console.log(`Listening on port ${port}!`))