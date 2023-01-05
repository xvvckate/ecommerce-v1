const express = require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")
const wishlistController = require("../../controllers/wishlistController")
const router = express.Router()

router.route("/")
      .get(wishlistController.getWishList)
      .post(wishlistController.addToWishList)
      .delete(wishlistController.removeFromWishList)

// router.route("/")
//       .get(verifyRoles(ROLES.CUSTOMER), wishlistController.getWishList)
//       .post(verifyRoles(ROLES.CUSTOMER), wishlistController.addToWishList)
//       .delete(verifyRoles(ROLES.CUSTOMER), wishlistController.removeFromWishList)


module.exports = router