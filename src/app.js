const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello from dashboard");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});
app.use("/test", (req, res) => {
  res.send("I'm in the test Route");
});

app.listen(3000, () => {
  console.log(" Server is listening at port 3000");
});

// server created
