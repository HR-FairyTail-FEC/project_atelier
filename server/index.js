const express = require('express');

const app = express();
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { Options } = require('../config');

const port = 3000;
const fullPath = path.join(__dirname, '../public/dist');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(fullPath));

app.get('/api/products', (request, response) => {
  const id = request.query.product_id;
  if (id) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?product_id=${id}`, { headers: Options })
    .then(res => response.json(res.data))
    .catch(err => console.error(err));
  } else {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { headers: Options })
    .then(res => response.json(res.data))
    .catch(err => console.error(err));
  }
});

app.get('/api/products/:id/styles', (request, response) => {
  const { id } = request.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});

app.get('/api/products/:id/related', (request, response) => {
  const { id } = request.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});

app.get('/api/reviews', (request, response) => {
  const id = request.query.product_id;
  const { sort } = request.query;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=${id}&sort=${sort}`, { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});

app.get('/api/reviews/meta', (request, response) => {
  const id = request.query.product_id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`, { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});

app.get('/api/qa/questions', (request, response) => {
  const id = request.query.product_id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});

app.get('/api/cart', (request, response) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart', { headers: Options })
    .then((res) => response.json(res.data))
    .catch((err) => console.error(err));
});


//posting new questions and answers
app.post('/api/qa/questions/:question_id/answers', (request, response) => {
  const data = request.body;
  const { question_id } = request.params;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/answers`, data, { headers: Options })
    .then((res) => response.json(res))
    .catch((err) => console.error(err));
});

app.post('/api/qa/questions', (request, response) => {
  const data = request.body;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`, data, { headers: Options })
    .then((res) => response.json(res))
    .catch((err) => console.error(err));
});
//put calls for helpful or reported Q
app.put('api/qa/questions/:question_id/helpful', (request, response) => {
  const data = request.body;
  const { question_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/helpful`, data, { headers: Options })
  .then((res) => response.json(res))
  .catch((err) => console.error(err));
});

app.put('api/qa/questions/:question_id/report', (request, response) => {
  const data = request.body;
  const { question_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/report`, data, { headers: Options })
  .then((res) => response.json(res))
  .catch((err) => console.error(err));
});


//put calls for helpful or reported A
app.put('api/qa/answers/:answer_id/helpful', (request, response) => {
  const data = request.body;
  const { answer_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/helpful`, data, { headers: Options })
  .then((res) => response.json(res))
  .catch((err) => console.error(err));
});

app.put('api/qa/answers/:answer_id/report', (request, response) => {
  const data = request.body;
  const { answer_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/report`, data, { headers: Options })
  .then((res) => response.json(res))
  .catch((err) => console.error(err));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
