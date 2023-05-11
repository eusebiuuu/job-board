require('dotenv').config();
require('express-async-errors')
const express = require('express');
const version1Router = require('./versions/api-v1.js');
const morgan = require('morgan');
const { notFoundMiddleware } = require('./middlewares/notFound.js');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.set('trust proxy', 1);
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use(express.json());
app.use(morgan('common'));
app.use('/api/v1', version1Router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;