const { Router } = require("express");
const { addcurrency_type, getcurrency_type, updatecurrency_type, deletecurrency_type, getcurrency_typeById } = require("../controllers/currency_type.controller");

const router = Router();

router.post("/", addcurrency_type);
router.get("/", getcurrency_type);
router.put("/:id", updatecurrency_type);
router.delete("/:id", deletecurrency_type);
router.get("/:id", getcurrency_typeById);

module.exports = router;
