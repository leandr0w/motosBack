const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const repairsRouter = require('./routes/repairs.router');
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//routes
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
