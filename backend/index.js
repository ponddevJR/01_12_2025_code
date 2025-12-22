const express = require("express");
const { default: subjectRoute } = require("./routes/subject.route");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const { default: stdRoute } = require("./routes/std.route");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(subjectRoute);
app.use(stdRoute);

app.get("/health", async (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Server start at port : 5000");
});
