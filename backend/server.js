require('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");
const {response, json} = require("express");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;



app.get('/', (req, res) => {
  const city = 'Brasil';//req.body
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric&lang=pt_br`;
  https.get(openWeatherUrl, (response) => {
    console.log(response.statusCode);
    response.on("data", async (data) => {
      try {
        let { max_temp, min_temp, lat, lon, feels_like, description } = await getWeatherData(data);
        console.log();
        res.send(`Temperature: { 
          max: ${max_temp}, 
          min: ${min_temp}, 
          feels_like: ${feels_like}, 
          lat: ${lat}, 
          lon: ${lon}, 
          description: ${description} 
          }`).end();
      } catch (e) {
        res.send(`Error while getting OpenWeather data\n error code: ${e}\n Status code: ${response.statusCode}`).end();
      }
    });
  });
});

const getWeatherData = async (data) => {
  const weatherData = JSON.parse(data);
  const max_temp = weatherData.main.temp_max;
  const min_temp = weatherData.main.temp_min;
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;
  const feels_like = weatherData.main.feels_like;
  let description = weatherData.weather[0].description;
  return {
    max_temp,
    min_temp,
    lat,
    lon,
    feels_like,
    description
  };
};


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});