
const express = require("express")
const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")
const commentController = require("../../controllers/commentController")

const router = express.Router()

router.route("/")
      .get(commentController.getComments)
      .post(commentController.createComment)
      .put(commentController.updateComment)

router.route("/delete")
      .delete(commentController.deleteComment)

// router.route("/")
//       .post(verifyRoles(ROLES.CUSTOMER), commentController.createComment)
//       .put(verifyRoles(ROLES.CUSTOMER), commentController.updateComment)
// router.route("/delete")
//       .delete(verifyRoles(ROLES.CUSTOMER), commentController.deleteComment)

module.exports = router
