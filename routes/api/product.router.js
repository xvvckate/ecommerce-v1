// const express = require("express")

// const verifyRoles = require("../../middleware/verifyRoles")
// const { ROLES } = require("../../config/roleList")
// const productController = require("../../controllers/productController")
// const router = express.Router()

// router.route("/")
//       .get(productController.getProducts)
//       .post(verifyRoles(ROLES.ADMIN, ROLES.EMPLOYEE), productController.addProduct)
//       .put(verifyRoles(ROLES.ADMIN, ROLES.EMPLOYEE), productController.updateProduct)
//       .delete(verifyRoles(ROLES.ADMIN, ROLES.EMPLOYEE), productController.deleteProduct)

// router.route("/:id")
//       .get(productController.getProduct)

// module.exports = router
