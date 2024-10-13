const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Something went wront" + err.messag);
  }
});

app.get("/feed", async (req, res) => {
  const user = await User.find({});

  try {
    res.send(user);
  } catch (err) {
    res.send("Something went wrong" + err.messag);
  }
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
