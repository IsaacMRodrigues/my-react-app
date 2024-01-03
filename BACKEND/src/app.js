const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors(), router);


module.exports = app;
