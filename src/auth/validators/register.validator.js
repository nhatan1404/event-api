import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.boolean().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  repassword: Joi.any().equal(Joi.ref('password')).required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(10).optional(),
  birthday: Joi.date().optional(),
});

export default registerSchema;
