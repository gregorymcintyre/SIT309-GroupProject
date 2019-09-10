const express = require('express')
var bodyParser = require('body-parser')
var request = require('request');
const app = express()
const port = 3000;
const cors = require('cors');
var weatherData = {}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/weather/current/:lat/:lng', function (req, res) { //Retreive current weather information for lat and long

lat = req.params.lat
lng = req.params.lng
var d  = (new Date).getTime();

    request.get(`
    https://api.darksky.net/forecast/2863177e8cb7681e2d21b3595b571989/${lat},${lng}?exclude=minutely,hourly,alerts,flags&units=si
  `, function(err, response, body) {
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
            "windSpeed": weatherData.currently.windSpeed 
        }

        res.send(weather)
});

  })
app.get('/parking/:lat/:lng', function (req, res) {
  
  lat = req.params.lat
  lng = req.params.lng
  var result = {}
  request.get(`https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?lat=${lat}&lon=${lng}`, function(err, response, body) {
   result = JSON.parse(body)

   //res.send(result[0].bay_id) this is how you access the json
   result = {
    bay_id: result[0].bay_id,
    location: { lattitude: result[0].location.latitude,
      longitude: result[0].location.longitude
    },
    status: result[0].status
   }
   res.send(result)
   
  })


  

})

app.listen(port, () => console.log(`Listening on port ${port}!`))