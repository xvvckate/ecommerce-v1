const express = require("express")
const router = express.Router()
const profileController = require("../../controllers/profileController")

router.route("/")
      .get(profileController.viewProfile)
      .post(profileController.createProfile)

router.route("/address")
    .post(profileController.addMoreAddress)
    .put(profileController.updateAddress)
    .delete(profileController.removeAddress)



module.exports = router

