import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '../utils/customError.mjs';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const message = err.message || 'Something went wrong, please try again later';
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  throw new CustomAPIError(message, statusCode);
};

export { errorHandlerMiddleware };



//   if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(',');
//     customError.statusCode = 400;
//   }
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(
//       err.keyValue
//     )} field, please choose another value`;
//     customError.statusCode = 400;
//   }
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`;
//     customError.statusCode = 404;
//   }