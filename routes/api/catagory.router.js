const express = require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")

const catagoryController = require("../../controllers/catagoryController")
const router = express.Router()

router.route("/")
      .get(catagoryController.getCatagorys)
      .post(catagoryController.createCatagory)
      .put(catagoryController.updateCatagory)
      .delete(catagoryController.removeCatagory)

router.route("/:id")
      .get(catagoryController.getCatagory)

// router.route("/")
//       .post(verifyRoles(ROLES.ADMIN), catagoryController.createCatagory)

module.exports = router
