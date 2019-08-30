# SIT 311 GROUP PROJECT
### Members: 
---
| Name     | Job          | 
| ------------- |:-------------:|
| Tim Tattersal      | Dashboard (Front End) | 
| Marshal Welgama    | Backend API      | 
| Mehul Warde | Backend API      | 
| Greg Macintyre | AWS IOT      | 

## Front End:
---
- Angular Js
- Do not make any changes to code
- Any requests, recomendations speak to Tim first 

#### Peview
###### Main Interface
![alt text](resources/gui-wireframes/Main%20Interface.png)
![alt text](resources/gui-wireframes/Main%20Interface%20(IoT%20Activity).png)
![alt text](resources/gui-wireframes/Main%20Interface%20(Settings).png)
###### Find Parking
![alt text](resources/gui-wireframes/Find%20a%20Park.png)
![alt text](resources/gui-wireframes/Find%20a%20Park%20(List%20View).png)
![alt text](resources/gui-wireframes/Find%20a%20Park%20(Individual%20Parks).png)
###### Search Box
![alt text](resources/gui-wireframes/Searchbox.png)
![alt text](resources/gui-wireframes/Searchbox%20(Advanced%20Search).png)


## Back End:
---
![alt text](flowchart.jpg)
## Weather Data

><center>For the weather data we will be using the darksky.net API since it is very inutuitive<center>


You will need to get an account and make API calls

Example: 

```
GET https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/<insert co-ordinates>

This example used my API key
```

#### *Endpoints*

- /weather/current/:lat/:lng

Description: Retrieves a weather data for lattitude and longitude in reqested parameters

Example Response:

```

{
    "latitude": 42.3601,
    "longitude": -71.0589,
    "timezone": "America/New_York",
    "currently": {
        "time": 1509993277,
        "summary": "Drizzle",
        "temperature": 66.1,
        "apparentTemperature": 66.31,
        "temperatureHigh": 31.84,
        "temperatureLow": 28.63,
        "windSpeed": 5.59,
    }
}

```





## Parking Data
talk about shit here

## IOT Devices
talk about more shit






