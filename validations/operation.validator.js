const Joi = require("joi");

const operationSchema = Joi.object({
  order_id: Joi.number().required(),
  status_id: Joi.number().required(),
  admin_id: Joi.number().required(),
  description: Joi.string().required(),
});

module.exports = operationSchema;
