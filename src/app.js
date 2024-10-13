const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validate = require("./utils/loginValidation");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, age, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(salt);
  console.log(hashedPassword);

  const user = new User({
    firstName,
    lastName,
    emailId,
    age,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    await validate(req);

    const user = await User.findOne({ emailId: emailId });

    if (!user)
    {
      throw new Error("User not Found!!");
    }
    
    const isValidPass = await bcrypt.compare(password, user.password);
    console.log(isValidPass);

    if (!isValidPass) {
      throw new Error("Invalid Credentials!!");
    } else {
      res.send("Welcome to the feed page !! We hope you find a match soon💖!!");
    }
  } catch (err) {
    res.status(400).send(err.message);
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
