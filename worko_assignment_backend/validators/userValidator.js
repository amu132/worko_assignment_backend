const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  city: Joi.string().required(),
  zipCode: Joi.string().length(5).required(),
});

const partialUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    age: Joi.number().integer().min(0),
    city: Joi.string(),
    zipCode: Joi.string().length(5),
}).min(1);  

const idSchema = Joi.number().integer().required();

function validateUser(user) {
  return userSchema.validate(user);
}

function validateId(id) {
  return idSchema.validate(id);
}

function validatePartialUser(partialUser) {
    return partialUserSchema.validate(partialUser);
}

module.exports = {
  validateUser,
  validateId,
  validatePartialUser
};
