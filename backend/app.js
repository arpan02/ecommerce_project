const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const env = require('./config/environment');
const ErrorHandler = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controllers/error-controllers');

const app = express();

app.use(express.urlencoded());

// app.use('/a', express.static(path.join(__dirname, '/uploads')));
// app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// login request
if (env.name === 'development') {
  app.use(morgan('dev'));
}
// security http header
app.use(helmet());

// limit request from same api
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request, Please try again',
});

app.use('/', limiter);

// Body parser
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization agaist Nosql query injection
app.use(mongoSanitize());

// Data sanitization agi XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    // allow duplicate string in parameter
    whitelist: ['sort', 'slug'],
  })
);

// Serving static files
// app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api', require('./routes'));

// Handler error for all page which are not found
app.all('*', (req, res, next) => {
  // if we pass argument and express will automatically know that it's error
  next(new ErrorHandler(`${req.originalUrl} Not found`, 404));
});

// Error Handling middleware and express will understand as its have four arguments
app.use(globalErrorHandler);

// module.exports = app;
module.exports = app;
