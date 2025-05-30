const { v4: uuidv4 } = require("uuid");
const response_handler = require("../helpers/responseHandler");
const validations = require("../validations");
const { Account } = require("../config/db");

exports.create_account = async (req, res) => {
  try {
    const create_account_validator = validations.create_account.validate(
      req.body,
      {
        abortEarly: true,
      }
    );
    if (create_account_validator.error) {
      return response_handler(
        res,
        400,
        `Invalid input: ${create_news_validator.error}`
      );
    }

    const secret_token = uuidv4();
    req.body.secret_token = secret_token;
    const account = await Account.create(req.body);

    return response_handler(res, 201, "Account created successfully", account);
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.get_all_accounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    return response_handler(
      res,
      200,
      "Accounts fetched successfully",
      accounts
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.get_account_by_id = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    return response_handler(res, 200, "Account fetched successfully", account);
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.update_account_by_id = async (req, res) => {
  try {
    const update_account_validator = validations.update_account.validate(
      req.body,
      {
        abortEarly: true,
      }
    );
    if (update_account_validator.error) {
      return response_handler(
        res,
        400,
        `Invalid input: ${update_account_validator.error}`
      );
    }

    const account = await Account.findByPk(req.params.id);
    await account.update(req.body);
    return response_handler(res, 200, "Account updated successfully", account);
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.delete_account_by_id = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    await account.destroy();
    return response_handler(res, 200, "Account deleted successfully");
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};
