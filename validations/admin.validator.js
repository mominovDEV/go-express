const Joi = require("joi");

const adminSchema = Joi.object({
  full_name: Joi.string().required(),
  user_name: Joi.string().required(),
  hashed_password: Joi.string().min(6).max(29).required(),
  phone_number: Joi.number(),//.pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  email: Joi.string().email().message("Invalid email").required(),
  tg_link: Joi.string().required(),
  description: Joi.string().required(),
});





module.exports = adminSchema;
