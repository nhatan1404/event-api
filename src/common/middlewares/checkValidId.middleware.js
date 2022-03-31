import { isValidId } from '../utils/mongodb.util.js';

const checkValidId = (req, res, next) => {
  if (isValidId(req.params.id)) {
    next();
  } else res.error({ message: 'Invalid id' });
};

export default checkValidId;
