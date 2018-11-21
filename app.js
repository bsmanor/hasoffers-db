const express = require('express');
const app = express();
const morgan = require('morgan');
const dataAuditsRoutes = require('./api/routes/data_audits');
const bodyParser = require('body-parser');

// Morgan will output informaiton of the HTTP request
app.use(morgan('dev'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow_Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

// Handeling routes
app.use('/data_audits', dataAuditsRoutes);

// Error handeling - 404
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status(404);
  next(error);
})

// Error handeling - 500
app.use((error, req, res, next) => {
  res.status(error.status || 500);
   res.json({
     error: {
       message: error.message
     }
   });
})

module.exports = app;