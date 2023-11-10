const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('You are connected with the server!');
});


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});