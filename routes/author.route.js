const {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginAuthor,
} = require("../controllers/author.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");
const authorSelfGuard = require("../middlewares/guards/author-self.guard");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginAuthor);
router.get("/", authorJwtGuard, findAll);
router.get("/:id", authorJwtGuard, authorSelfGuard, findOne);
router.patch("/:id", authorJwtGuard, authorSelfGuard, update);
router.delete("/:id", authorJwtGuard, authorSelfGuard, remove);

module.exports = router;
