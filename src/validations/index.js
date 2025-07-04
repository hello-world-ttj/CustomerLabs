const Joi = require("joi");

exports.create_account = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  website: Joi.string(),
});

exports.update_account = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  website: Joi.string(),
  secret_token: Joi.string(),
});

exports.create_destination = Joi.object({
  account_id: Joi.number().required(),
  url: Joi.string().required(),
  method: Joi.string().required(),
  headers: Joi.object().required(),
});

exports.update_destination = Joi.object({
  account_id: Joi.number(),
  url: Joi.string(),
  method: Joi.string(),
  headers: Joi.object(),
});
