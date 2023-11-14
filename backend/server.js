require('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const city = "Paris";
const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric&lang=pt_br`;

app.get('/', (req, res) => {
  https.get(openWeatherUrl, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      console.log(temperature);
    });
  });
  res.send('You are connected with the server!');
});


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});