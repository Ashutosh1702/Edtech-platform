const {Router} =require("express")
const { createOrder, captureOrder, getAllOrders, getSingleOrder } = require("../controllers/orderController")

const router = Router()


router.post("/create", createOrder)
router.post("/capture",captureOrder)
router.get('/all', getAllOrders)
router.get('/:id', getSingleOrder)

module.exports=router