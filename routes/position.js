const express = require("express")
const posController = require("../controller/posController")
//创建路由对象
const router = express.Router()
const authMiddle = require("../middleware/authMiddle")

router.post("/add",posController.add)
router.get("/find",authMiddle,posController.find)
router.get("/:id",posController.findById)
router.post("/update",posController.update)
router.post("/delete",posController.deleteOne)
module.exports = router;