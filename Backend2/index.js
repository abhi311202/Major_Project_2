import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Modules/User/Routes/userRoutes.js";
import adminRoutes from "./Modules/Admin/Routes/adminRoutes.js";
import superAdminRoutes from "./Modules/SuperAdmin/Routes/superAdminRoutes.js";
import documentRoutes from "./Modules/Document/Routes/documentRoutes.js";
import paymentRoutes from "./Modules/Payment/Routes/paymentRoutes.js";
import servicesRoutes from "./Services/Routes/servicesRoutes.js";
import aiServicesRoutes from "./Modules/AI_Services/Routes/aiServicesRoutes.js";
import cookieParser from "cookie-parser";
import connectMongo from "./config/mongoClient.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

dotenv.config();
const port = process.env.PORT || 4000;

// Simulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files (e.g., for React frontend)
// ✅ Serve static files from React build folder
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// // // ✅ Catch-all for SPA client-side routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

connectMongo();

// app.get("/", (req, res) => {
//   res.send("Hello Abiiii!");
// });

app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);
app.use("/Services", servicesRoutes);
app.use("/Document", documentRoutes);
app.use("/Payments", paymentRoutes);
app.use("/AI-Services", aiServicesRoutes);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
