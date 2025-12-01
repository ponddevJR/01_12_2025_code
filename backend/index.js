const express = require("express");
const app = express();
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Server start at port : 5000");
});
