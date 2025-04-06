const mongoose = require("mongoose");

const db_connection = async () => {
    try {
      if (process.env.MODE === "production") {
        await mongoose.connect(process.env.db_producation_url);
        console.log("Production Database Connection Successful");
      } else {
        await mongoose.connect(process.env.db_local_url);
        console.log("Local Database Connection Successful");
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  module.exports = db_connection;