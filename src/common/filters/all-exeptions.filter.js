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
    return res.status(statusCode).json({
      errors,
      statusCode,
      message,
    });
  };

  res.notFound = function (
    errors = {},
    statusCode = 404,
    message = 'Not Found',
  ) {
    return res.status(statusCode).json({ errors, statusCode, message });
  };

  res.noContent = function (statusCode = 204, message = 'Not Content') {
    return res.status(statusCode).json({ statusCode, message });
  };

  res.unprocessableEntity = function (
    errors = {},
    statusCode = 422,
    message = 'Unprocessable Entity',
  ) {
    return res.status(statusCode).json({ errors, statusCode, message });
  };

  res.forbidden = function (
    errors = {},
    statusCode = 403,
    message = 'Forbidden',
  ) {
    return res.status(statusCode).json({ errors, statusCode, message });
  };

  res.unauthorized = function (
    errors = {},
    statusCode = 401,
    message = 'Unauthorized',
  ) {
    return res.status(statusCode).json({ errors, statusCode, message });
  };

  res.internal = function (
    errors = {
      message: 'Oops! something went wrong',
    },
    statusCode = 500,
    message = 'Internal server error',
  ) {
    return res.status(statusCode).json({ errors, statusCode, message });
  };

  next();
};

export default AllFilterExceptions;
