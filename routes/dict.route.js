const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/dict.controller");
const authorExpertGuard = require("../middlewares/guards/author-expert.guard");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/", authorJwtGuard, authorExpertGuard, create);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
