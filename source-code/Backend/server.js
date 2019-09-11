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
app.get('/parking/fake/:lat/:lng', function (req, res) {
  lat = req.params.lat
  lng = req.params.lng

  result = [
    {
        "bay_id": "1005",
        "location": {
            "lattitude": "-37.813104376935705",
            "longitude": "144.9625311043034"
        },
        "status": "Present",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "240"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1006",
        "location": {
            "lattitude": "-37.81305337978721",
            "longitude": "144.96250770939437"
        },
        "status": "Present",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "240"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1007",
        "location": {
            "lattitude": "-37.812853691907605",
            "longitude": "144.96262375530551"
        },
        "status": "Present",
        "restrictions": [
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "0"
                },
                "effectiveonph": "1",
                "time": {
                    "start": "07:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    0
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "240",
                    "disablity": "0"
                },
                "effectiveonph": "1",
                "time": {
                    "start": "20:30:00",
                    "end": "23:59:59"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1019",
        "location": {
            "lattitude": "-37.81537450838522",
            "longitude": "144.9609981458234"
        },
        "status": "Unoccupied",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "16:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "daysTranslated": "Monday to Friday"
            },
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "19:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "daysTranslated": "Monday to Friday"
            },
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "19:30:00"
                },
                "days": [
                    6
                ],
                "daysTranslated": "Only on Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1022",
        "location": {
            "lattitude": "-37.81382636470905",
            "longitude": "144.9600326035407"
        },
        "status": "Unoccupied",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "240"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1023",
        "location": {
            "lattitude": "-37.81377750455344",
            "longitude": "144.96001017219652"
        },
        "status": "Present",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "240"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    },
    {
        "bay_id": "1024",
        "location": {
            "lattitude": "-37.813567450483426",
            "longitude": "144.95991378250756"
        },
        "status": "Unoccupied",
        "restrictions": [
            {
                "isFree": true,
                "duration": {
                    "normal": "30",
                    "disablity": "60"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "120",
                    "disablity": "240"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "18:30:00",
                    "end": "20:30:00"
                },
                "days": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "daysTranslated": "Monday to Sunday"
            },
            {
                "isFree": false,
                "duration": {
                    "normal": "60",
                    "disablity": "120"
                },
                "effectiveonph": "0",
                "time": {
                    "start": "07:30:00",
                    "end": "18:30:00"
                },
                "days": [
                    0
                ],
                "daysTranslated": "Only on Sunday"
            }
        ]
    } ]
  res.send(result)
})

  app.listen(port, () => console.log(`Listening on port ${port}!`))