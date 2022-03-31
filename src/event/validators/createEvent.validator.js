import Joi from 'joi';

const createEventSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.any().required(),
  address: Joi.string().required(),
  quantity: Joi.number().required(),
  placeHost: Joi.string().required(),
  description: Joi.string().optional(),
  date: Joi.date().required(),
  timeStart: Joi.date().required(),
  timeFinish: Joi.date().required(),
});

export default createEventSchema;
