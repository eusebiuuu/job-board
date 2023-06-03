require('dotenv').config();
require('express-async-errors')
const express = require('express');
const version1Router = require('./versions/api-v1.js');
const morgan = require('morgan');
const { notFoundMiddleware } = require('./middlewares/notFound.js');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cloudinary = require('cloudinary').v2;
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.set('trust proxy', 1);
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  standardHeaders: true,
  message: `<h1 style='display:flex; align-items:center; justify-content:center; height:100vh'>
    429 - Too many Requests <br> Try again later!
  </h1>`,
}));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan('common'));
app.use('/api/v1', version1Router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;