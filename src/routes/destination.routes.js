const express = require("express");
const router = express.Router();
const destination_controller = require("../controllers/destination.controller");

router
  .route("/")
  .get(destination_controller.get_all_destinations)
  .post(destination_controller.create_destination);

router.get(
  "/account/:id",
  destination_controller.get_all_destinations_by_account_id
);

router
  .route("/:id")
  .get(destination_controller.get_destination_by_id)
  .put(destination_controller.update_destination_by_id)
  .delete(destination_controller.delete_destination_by_id);

module.exports = router;
