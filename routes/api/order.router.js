const express =require("express")

const { ROLES } = require("../../config/roleList")
const verifyRoles = require("../../middleware/verifyRoles")
const orderController = require("../../controllers/orderController")
const router = express.Router()

router.route("/")
     .get(orderController.getOrders)
     .post(orderController.placeOrder)
     .put(orderController.updateOrder)
     .delete(orderController.removeOrder)

router.route("/:id")
      .get(orderController.getOrder)
     
// // router.route("/")
// //       .get(verifyRoles(ROLES.CUSTOMER), orderController.getOrder)
// //       .post(verifyRoles(ROLES.CUSTOMER), orderController.placeOrder)
// //       .delete(verifyRoles(ROLES.CUSTOMER), orderController.cancleOrder)

// // router.route("/:id")
// //       .get(verifyRoles(ROLES.CUSTOMER), orderController.getOrder)
     
module.exports = router