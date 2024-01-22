function errorHandler(err, req, res, next) {
  // console.log(err);
  let errCode = 500;
  let errMessage = `Internal Server Error`;

  switch (err.name) {
    case `SequelizeValidationError`:
    case `SequelizeUniqueConstraintError`:
      errCode = 400;
      errMessage = err.errors[0].message;
      break;

    case `Email is required`:
    case `Password is required`:
      errCode = 400;
      errMessage = err.name;
      break;

    case `Email or Password is invalid`:
      errCode = 401;
      errMessage = err.name;
      break;

    case `Invalid Token`:
      errCode = 401;
      errMessage = err.name;
      break;

    case `JsonWebTokenError`:
      errCode = 401;
      errMessage = `Invalid Token`;
      break;

    case `Forbidden Access`:
      errCode = 403;
      errMessage = err.name;
      break;

    case `Data not Found`:
      errCode = 404;
      errMessage = err.name;
      break;

    default:
      break;
  }

  res.status(errCode).json({ message: errMessage });
}

module.exports = { errorHandler };
