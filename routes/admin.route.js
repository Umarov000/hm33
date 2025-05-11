
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginAdmin,
} = require("../controllers/admin.controller");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard");
const adminSelfGuard = require("../middlewares/guards/admin-self.guard");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginAdmin);
router.get("/", adminJwtGuard, findAll);
router.get("/:id", adminJwtGuard, adminSelfGuard, findOne);
router.patch("/:id", adminJwtGuard, adminSelfGuard, update);
router.delete("/:id",adminJwtGuard,adminSelfGuard,remove);

module.exports = router;
