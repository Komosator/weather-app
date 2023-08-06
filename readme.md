# Current Weather - created by Jan Komosinski

The application is used to check the current weather.
It is based on geolocation and weather information from [Open Weather Map](https://openweathermap.org/ 'Open Weather Map'). Firstly, I fetch information from the geolocation API, and then pass it in a second request to fetch weather data.

Please note that due the application uses my **private API KEY**, you need to create your own so it work properly at your local environment. Find below a short instruction:

1. Get API KEY from OpenWeatherMap

- Visit https://openweathermap.org/
- Create account and log in
- Visit https://openweathermap.org/api
- Subscribe FREE plan of 'Current weather data'
- Go to 'My API keys' TAB and by clicking 'Generate', create your own private key.

2. Add API KEY to project

- In the main folder create 'api_key.js' file.
- Content of this file is very simple, you need to add only one line:
  `export const API_KEY = '&appid=[ABC]'; `
  \*where ABC is your private API KEY

Eg.:
`export const API_KEY = '&appid=j5nx8nuhrv5xi3ujr8mydts5l2cror5q';`

Enjoy! :smile:
