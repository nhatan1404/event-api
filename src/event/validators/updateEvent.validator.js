import Joi from 'joi';

const updateEventSchema = Joi.object({
  title: Joi.string().optional(),
  image: Joi.any().optional(),
  address: Joi.string().optional(),
  quantity: Joi.number().optional(),
  placeHost: Joi.string().optional(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
  timeStart: Joi.date().optional(),
  timeFinish: Joi.date().optional(),
});

export default updateEventSchema;
