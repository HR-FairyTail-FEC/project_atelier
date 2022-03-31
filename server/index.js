const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { Options } = require('../config.js');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '../public/dist'));

app.get('/api/products', (request, response) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {headers: Options})
    .then(res => response.json(res.data))
    .catch(err => console.error(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});