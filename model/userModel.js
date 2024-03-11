const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  usernameCN: Joi.string()
    .min(3)
    .max(30)
    .required(),
});

module.exports = userSchema;
