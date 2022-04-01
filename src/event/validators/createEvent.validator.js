import Joi from 'joi';

const createEventSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.any().optional(),
  address: Joi.string().required(),
  quantity: Joi.number().required(),
  placeHost: Joi.string().required(),
  description: Joi.string().optional(),
  date: Joi.date().required(),
  timeStart: Joi.any().required(),
  timeFinish: Joi.any().required(),
});

export default createEventSchema;
