const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Getting our express app");
});

app.listen(3000);
