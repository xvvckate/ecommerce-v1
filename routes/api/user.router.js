const express = require("express")
const router = express.Router()

const userController = require("../../controllers/userController")

router.route("/")
    .get(userController.getAllUsers)
    .post(userController.registerUser)


router.route("/recovery_phone_number")
      .post(userController.addRecoveryPhoneNumber)
      .delete(userController.removeRecoveryPhoneNumber)

module.exports = router
