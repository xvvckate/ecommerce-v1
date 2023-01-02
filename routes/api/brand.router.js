const express = require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")

const brandController = require("../../controllers/brandController")
const router = express.Router()

router.route("/")
      .get(brandController.getBrands)
      .post(brandController.createBrand)
      .put(brandController.updateBrand)
      .delete(brandController.removeBrand)

router.route("/:id")
      .get(brandController.getBrand)

// router.route("/")
//       .post(verifyRoles(ROLES.ADMIN), brandController.createBrand)

module.exports = router
