const express = require("express");
const { default: subjectRoute } = require("./routes/subject.route");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(subjectRoute);

app.get("/health", async (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Server start at port : 5000");
});
