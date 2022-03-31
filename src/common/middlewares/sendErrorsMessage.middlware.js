import { validationResult } from 'express-validator';

const sendErrorsMessage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.error(errors.array());
  }
  return next();
};

export default sendErrorsMessage;
