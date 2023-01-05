const express = require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")

const itemDetailController = require("../../controllers/itemDetailController")
const router = express.Router()

router.route("/")
      .get(itemDetailController.getItemDetails)
      .post(itemDetailController.createItemDetail)
      .put(itemDetailController.updateItemDetail)
      .delete(itemDetailController.removeItemDetail)

router.route("/:id")
      .get(itemDetailController.getItemDetail)

module.exports = router
