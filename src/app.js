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

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  const ALLOWED_UPDATES = ["photoUrl", "age", "skills", "about"];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updating not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });

    console.log(user);
    res.send("Update successful");
  } catch (err) {
    res.status(400).send("update can't be done" + err.message);
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
