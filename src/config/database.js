const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vivek:qZB6tpA4XgTJ5MwR@cluster0.d1y3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder"
  );
};

module.exports = connectDB;
