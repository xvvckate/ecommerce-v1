const express = require("express")
const router = express.Router()

const deliveryController = require("../../controllers/deliveryController")

router.route("")
      .get(deliveryController.getDeliverys)
      .post(deliveryController.createDelivery)

router.route("/:id")
      .get(deliveryController.getDelivery)

module.exports = router
      