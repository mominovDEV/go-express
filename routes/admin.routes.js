const { Router } = require("express");
const {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
  loginadmin,
  logoutAdmin,
} = require("../controllers/admin.controller");
const Validator = require("../middleware/validator");
const AdminPolice=require("../middleware/adminPolice");

const router = Router();

router.post("/", Validator("admin"), addAdmin);
router.get("/", AdminPolice, getAdmin);
router.put("/:id", Validator("adminU"), updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/:id", getAdminById);
router.post("/login", loginadmin);
router.post("/logout",logoutAdmin)

module.exports = router;
