import mongoose from "mongoose";
// import { configDotenv } from "dotenv";

import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MongoDBURI;

// connect to MONGODB/

try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error: ", error);
  }

  export default URI;