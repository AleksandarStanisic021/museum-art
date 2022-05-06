const { urlencoded } = require("express");
const express = require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const path = require("path");
const { getEnvironmentData } = require("worker_threads");
const logger = require("./middleware/logger");



const PORT = process.env.PORT || 5000;



const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

//middleware
app.use(logger);

//static
app.use(express.static(path.join(__dirname, "public")));
/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});*/

app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
