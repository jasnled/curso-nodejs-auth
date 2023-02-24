const Joi = require('joi');

const newPassword = Joi.string();
const token = Joi.string();
const email = Joi.string().email();
const password = Joi.string();

const recoveryPasswordSchema = Joi.object({
  email: email.required()
});

const changePasswordSchema =Joi.object({
  newPassword: newPassword.required(),
  token:token.required()
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});


module.exports = {recoveryPasswordSchema,changePasswordSchema,loginSchema}
