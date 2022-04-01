import Joi from 'joi';

const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  gender: Joi.boolean().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  repassword: Joi.any().equal(Joi.ref('password')).optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().min(10).max(10).optional(),
  birthday: Joi.date().optional(),
  isAdmin: Joi.boolean().optional(),
});

export default updateUserSchema;
