const { Router } = require("express");
const {
  createOrder,
  captureOrder,
  getAllOrders,
  getSingleOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = Router();

router.post("/create", protect, createOrder);
router.get("/capture", captureOrder);
router.post("/capture", captureOrder);
router.get("/all", protect, getAllOrders);
router.get("/:id", protect, getSingleOrder);

module.exports = router;
