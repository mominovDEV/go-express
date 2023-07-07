const { Router } = require("express");
const {
  addoperation,
  getoperation,
  updateoperation,
  deleteoperation,
  getoperationById,
} = require("../controllers/operation.controller");

const router = Router();

router.post("/", addoperation);
router.get("/", getoperation);
router.put("/:id", updateoperation);
router.delete("/:id", deleteoperation);
router.get("/:id", getoperationById);

module.exports = router;
