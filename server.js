'use strict';
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
// const morgan = require('morgan')
const Routes = require('./src/routes/routes.js')
const app = express();

app.use(express.json());
// app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["*"]);
  res.header("Access-Control-Allow-Headers",
    ["Origin", "X-Requested-With", "Authorization", "Content-Type"]);

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ['PUT, POST, PATCH, DELETE, GET']);
    return res.status(200).send({});
  }
  app.use(cors());
  next();
});

app.set('view engine', 'ejs')
app.use('/api/v1', Routes.routes);


module.exports = app