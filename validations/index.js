const admin = require("./admin.validator");
const adminU = require('./adminU.validator');
const order = require("./order.validator");
const status = require("./status.validation");
const operation = require("./operation.validator");
const topic = require("./topic.validator");


module.exports = {
  admin,
  adminU,
  order,
  status,
  operation,
  topic,
};
