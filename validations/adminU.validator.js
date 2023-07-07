const Joi = require("joi");

const adminUSchema = Joi.object({
  full_name: Joi.string().required(),
  user_name: Joi.string().required(),
  phone_number: Joi.number(), //.pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  email: Joi.string().email().message("Invalid email").required(),
  description: Joi.string().required(),
});

module.exports = adminUSchema;
