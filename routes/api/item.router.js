const express = require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")

const itemController = require("../../controllers/itemController")
const router = express.Router()

router.route("/")
      .get(itemController.getItems)
      .post(itemController.createItem)
      .put(itemController.updateItem)
      .delete(itemController.removeItem)

router.route("/:id")
      .get(itemController.getItem)

// router.route("/")
//       .post(verifyRoles(ROLES.ADMIN), itemController.createItem)

module.exports = router
