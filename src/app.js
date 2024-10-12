const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "kripalu",
    lastName: "Tripathi",
    password: "kripalu@123",
    age: 45,
    gender: "Male",
  };

  const user = new User(userObj);
  await user.save();
  res.send("user added successfully");
});

connectDB()
  .then(() => {
    console.log("Database connection sucessfull. I have finally fixed it.");

    app.listen(3000, () => {
      console.log(" Server is listening at port 3000");
    });
  })

  .catch((err) => {
    console.log("Database can't be connected.", err.message);
  });

// server created
