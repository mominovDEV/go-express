const { Router } = require("express");
const { addstatus, getstatus, updatestatus, deletestatus, getstatusById } = require("../controllers/status.controller");

const router = Router();

router.post("/", addstatus);
router.get("/", getstatus);
router.put("/:id", updatestatus);
router.delete("/:id", deletestatus);
router.get("/:id", getstatusById);

module.exports = router;
