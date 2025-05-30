const express = require("express");
const router = express.Router();
const account_controller = require("../controllers/account.controller");

router
  .route("/")
  .get(account_controller.get_all_accounts)
  .post(account_controller.create_account);

router
  .route("/:id")
  .get(account_controller.get_account_by_id)
  .put(account_controller.update_account_by_id)
  .delete(account_controller.delete_account_by_id);

module.exports = router;
