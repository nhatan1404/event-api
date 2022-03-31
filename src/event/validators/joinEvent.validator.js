import Joi from 'joi';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);
const joinSchema = Joi.object({
  userId: Joi.objectId(),
});

export default joinSchema;
