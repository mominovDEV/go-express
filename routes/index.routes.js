const { Router } = require("express");

const adminRouter = require("./admin.routes");
const current_typeRouter = require("./currency_type.routes");
const operationRoutes = require("./operation.routes");
const orderRouter = require("./order.routes");
const statusRouter = require("./status.routes");
const router = Router();

router.use("/admin",  adminRouter);
router.use("/current_type", current_typeRouter);
router.use("/operation", operationRoutes);
router.use("/order", orderRouter);
router.use("/status", statusRouter);


module.exports = router;
