import { isValidId } from '../utils/mongodb.util.js';

const checkValidId =
  (entityService = null) =>
  async (req, res, next) => {
    if (isValidId(req.params.id)) {
      if (entityService) {
        const service = new entityService();
        const data = await service.findById(req.params.id);
        if (!data) {
          return res.error({ message: 'Id does not exist' });
        }
        return next();
      }
      return next();
    }
    return res.error({ message: 'Invalid id' });
  };

export default checkValidId;
