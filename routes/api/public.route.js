const express = require("express")
const router = express.Router()

const itemDetailController = require("../../controllers/itemDetailController")
const userController = require("../../controllers/userController")

router.get('/products', itemDetailController.getItemDetails)
router.post("/register", userController.registerUser)

module.exports = router
