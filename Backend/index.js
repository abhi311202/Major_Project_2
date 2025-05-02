import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import superAdminRoutes from "./Routes/superAdminRoutes.js";
import cookieParser from "cookie-parser";
import connectMongo from "./config/mongoClient.js";


import multer from "multer";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT||4000;

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello Abi!");
});


// AWS S3 Client Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer for file uploads (temporary in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Endpoint to Upload PDF to S3
app.post("/upload-pdf", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(s3Params));
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;

    res.json({ message: "File uploaded successfully", pdf: fileUrl, filekey: s3Params.Key, filename: file.originalname, });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// DB Connection
mongoose.connect(process.env.MongoDBURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // app.listen(PORT, () => console.log(Server running on port ${PORT}));
})
.catch(err => console.error(err));