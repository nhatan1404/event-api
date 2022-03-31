const validator = (schema) => {
  return (req, res, next) => {
    schema
      .validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        if (error) {
          const errorMsg = error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));
          return res.unprocessableEntity(errorMsg);
        }
      });
  };
};

export default validator;
