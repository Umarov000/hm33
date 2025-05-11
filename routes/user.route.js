const {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginUser,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginUser);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
