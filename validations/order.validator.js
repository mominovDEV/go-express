const Joi = require("joi");

const userSchema = Joi.object({
  full_name: Joi.string().required(),
  phone_number: Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  product_link: Joi.string(),
  summa: Joi.string(),
  currency_type_id: Joi.number(),
  truck: Joi.string(),
  email: Joi.string().email().required(),
  description: Joi.string(),
});

module.exports = userSchema;
