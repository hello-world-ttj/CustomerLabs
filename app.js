require("dotenv").config();
const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const clc = require("cli-color");
const db = require("./src/config/db");
const accounts_route = require("./src/routes/account.routes");
const destinations_route = require("./src/routes/destination.routes");
const data_route = require("./src/routes/data.routes");
const response_handler = require("./src/helpers/responseHandler");

//! Create an instance of the Express application
const app = express();
//* Define the PORT & API version based on environment variable
const { PORT } = process.env;
//* Use volleyball for request logging
app.use(volleyball);
//* Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());
//* Parse JSON request bodies
app.use(express.json());

//* Health Check Route
app.get("/health", (req, res) => {
  return response_handler(res, 200, "✅ Server is healthy", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

//* Configure routes for user API
app.use(`/account`, accounts_route);
app.use(`/destination`, destinations_route);
app.use(`/server`, data_route);

//! Sync database and start server
db.sync().then(() => {
  app.listen(PORT, () => {
    const port_message = clc.redBright(`✓ App is running on port: ${PORT}`);
    console.log(port_message);
  });
});
