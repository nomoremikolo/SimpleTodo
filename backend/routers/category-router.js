const Router = require("express").Router;
const categoryController = require("../controllers/category-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/category", authMiddleware, categoryController.getCategories);
router.post("/category", authMiddleware, categoryController.addCategory);
router.delete(
  "/category/:id",
  authMiddleware,
  categoryController.removeCategory
);

module.exports = router;
