const { urlencoded } = require("express");
const express = require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const path = require("path");
const { getEnvironmentData } = require("worker_threads");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api/data", require("./routes/api/data"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
