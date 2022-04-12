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

// ratings and reviews

app.get('/api/reviews', (request, response) => {
  const id = request.query.product_id;
  // console.log('requet.query: ', request.query)
  const { sort } = request.query;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=${id}&sort=${sort}`, { headers: Options })
    .then((res) => {response.json(res.data)
    // console.log('res.data from get review: ', res.data)
    })
    .catch((err) => console.error(err));
});
  // meta
app.get('/api/reviews/meta', (request, response) => {
  const id = request.query.product_id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`, { headers: Options })
    .then(res => response.json(res.data))
    .catch((err) => console.error(err));
});

  // helpfulness put
app.put('/api/reviews/:review_id/helpful', (request, response) => {
  console.log('request.params: ', request.params)
  // console.log('request.body: ', request.body)
  const { review_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review_id}/helpful`, null , { headers: Options })
    .then(res => {
      response.json(res.data);
      console.log('Put request!')})
    .catch((err => {
      console.log(err)
      response.json(err)
    }));
})
/*
let obj = { dk: 'heyllo' }
let des = obj.dk              => 'heylllo'
    ====
let { dk } = obj              => ^^

*/
  // reportReview
app.put('/api/reviews/:review_id/report', (request, response) => {
  console.log('req param from report', request.params)
  const {review_id } = request.params;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review_id}/report`, null, { headers: Options })
  .then(res => {
    response.json(res.data);
    console.log('Put request for report')
  })
  .catch(err => {
    console.log(err)
    response.json(err);
  })
})

  // postReview
app.post('/api/reviews/', (request, response) => {
  console.log('req body from post: ', request.body)
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, request.body, { headers: Options })
    .then(res => {
      response.json(res.data)
      console.log('post request!!!!!!!!!!!')
    })
    .catch(err => {
      console.log(err)
      response.json(err)
    })
})

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
