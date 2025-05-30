require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./src/config/db");

// Sync database and start server
db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
