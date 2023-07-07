const { Router } = require("express");
const { addorders, getorders, updateorders, deleteorders, getordersById } = require("../controllers/order.controller");

const router = Router();

router.post("/", addorders);
router.get("/", getorders);
router.put("/:id", updateorders);
router.delete("/:id", deleteorders);
router.get("/:id", getordersById);

module.exports = router;
