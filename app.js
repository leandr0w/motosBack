const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const repairsRouter = require('./routes/repairs.router');
const usersRouter = require('./routes/users.router');
const globalErrorHandler = require('./controllers/error.controller');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');
const AppError = require('./utils/app.error');
const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request, try againt in one hour',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Estoy en developement');
}

if (process.env.NODE_ENV === 'production') {
}

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use('/api/v1', limiter);
//routes
app.use('/api/v1/repairs', repairsRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
