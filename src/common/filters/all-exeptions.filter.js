const AllFilterExceptions = (req, res, next) => {
  res.success = function (data = {}, statusCode = 200, message = 'OK') {
    return res
      .json({
        data,
        statusCode,
        message,
      })
      .status(statusCode);
  };

  res.error = function (
    errors = {},
    statusCode = 400,
    message = 'Bad Request',
  ) {
    return res
      .json({
        errors,
        statusCode,
        message,
      })
      .status(statusCode);
  };

  res.notFound = function (
    errors = {},
    statusCode = 404,
    message = 'Not Found',
  ) {
    return res.error({ errors, statusCode, message }).status(statusCode);
  };

  res.noContent = function (statusCode = 204, message = 'Not Content') {
    return res.error({ statusCode, message }).status(statusCode);
  };

  res.unprocessableEntity = function (
    errors = {},
    statusCode = 422,
    message = 'Unprocessable Entity',
  ) {
    return res.error({ errors, statusCode, message }).status(statusCode);
  };

  res.forbidden = function (
    errors = {},
    statusCode = 403,
    message = 'Forbidden',
  ) {
    return res.error({ errors, statusCode, message }).status(statusCode);
  };

  res.unauthorized = function (
    errors = {},
    statusCode = 401,
    message = 'Unauthorized',
  ) {
    return res.error({ errors, statusCode, message }).status(statusCode);
  };

  res.internal = function (
    errors = {
      message: 'Oops! something went wrong',
    },
    statusCode = 500,
    message = 'Internal server error',
  ) {
    return res.error({ errors, statusCode, message }).status(statusCode);
  };

  next();
};

export default AllFilterExceptions;
