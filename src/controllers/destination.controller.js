const { v4: uuidv4 } = require("uuid");
const response_handler = require("../helpers/responseHandler");
const validations = require("../validations");
const { Destination } = require("../config/db");

exports.get_all_destinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    return response_handler(
      res,
      200,
      "Destinations fetched successfully",
      destinations
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.create_destination = async (req, res) => {
  try {
    const create_destination_validator =
      validations.create_destination.validate(req.body, {
        abortEarly: true,
      });
    if (create_destination_validator.error) {
      return response_handler(
        res,
        400,
        `Invalid input: ${create_destination_validator.error}`
      );
    }

    req.body.headers = JSON.stringify(req.body.headers);
    const destination = await Destination.create(req.body);

    return response_handler(
      res,
      201,
      "Destination created successfully",
      destination
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.get_destination_by_id = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    return response_handler(
      res,
      200,
      "Destination fetched successfully",
      destination
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.update_destination_by_id = async (req, res) => {
  try {
    const update_destination_validator =
      validations.update_destination.validate(req.body, {
        abortEarly: true,
      });
    if (update_destination_validator.error) {
      return response_handler(
        res,
        400,
        `Invalid input: ${update_destination_validator.error}`
      );
    }

    const destination = await Destination.findByPk(req.params.id);
    await destination.update(req.body);
    return response_handler(
      res,
      200,
      "Destination updated successfully",
      destination
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.delete_destination_by_id = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    await destination.destroy();
    return response_handler(res, 200, "Destination deleted successfully");
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};

exports.get_all_destinations_by_account_id = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      where: {
        account_id: req.params.id,
      },
    });
    return response_handler(
      res,
      200,
      "Destinations fetched successfully",
      destinations
    );
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};
