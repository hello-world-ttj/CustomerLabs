const axios = require("axios");
const { Account, Destination } = require("../config/db");
const response_handler = require("../helpers/responseHandler");

exports.incoming_data_call = async (req, res) => {
  try {
    const token = req.headers["cl-x-token"];
    if (!token) return response_handler(res, 401, "Unauthorized");
    const account = await Account.findOne({
      where: { secret_token: token },
      include: Destination,
    });
    if (!account) return response_handler(res, 401, "Unauthorized");
    const content_type = req.headers["content-type"];
    if (content_type !== "application/json")
      return response_handler(res, 400, "Invalid content type");
    const data = req.body;
    if (!data) return response_handler(res, 400, "Invalid data");

    for (const dest of account.Destinations) {
      try {
        const headers = JSON.parse(dest.headers);
        if (dest.method.toUpperCase() === "GET") {
          await axios.get(dest.url, { headers, params: data });
        } else {
          await axios({ method: dest.method, url: dest.url, headers, data });
        }
      } catch (err) {
        return response_handler(
          res,
          500,
          `Error forwarding to ${dest.url}: ${err.message}`
        );
      }
    }
    return response_handler(res, 200, "Data forwarded successfully");
  } catch (error) {
    return response_handler(
      res,
      500,
      `Internal Server Error: ${error.message}`
    );
  }
};
