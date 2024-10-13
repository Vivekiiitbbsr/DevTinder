const mongoose = require("mongoose");
const URI =require("../constants")

const connectDB = async () => {
  await mongoose.connect(
    URI
  );
};

module.exports = connectDB;
