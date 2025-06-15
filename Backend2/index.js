// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import userRoutes from "./Modules/User/Routes/userRoutes.js";
// import adminRoutes from "./Modules/Admin/Routes/adminRoutes.js";
// import superAdminRoutes from "./Modules/SuperAdmin/Routes/superAdminRoutes.js";
// import documentRoutes from "./Modules/Document/Routes/documentRoutes.js";
// import paymentRoutes from "./Modules/Payment/Routes/paymentRoutes.js";
// import servicesRoutes from "./Services/Routes/servicesRoutes.js";
// import cookieParser from "cookie-parser";
// import connectMongo from "./config/mongoClient.js";

// const app = express();
// const __dirname = path.resolve();
// app.use(cors()); 
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// // Serve static files from the Frontend build directory
// // app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// // // // Route all undefined routes to the index.html in the dist directory (SPA support)
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../Frontend/dist/index.html")); // Ensuring correct path to index.html
// //  });

// dotenv.config();
// const port = process.env.PORT || 4000;

// // Serve static files from the Frontend build directory
// app.use(express.static(path.join(__dirname, "../Frontend/dist")));


// // // Route all undefined routes to the index.html in the dist directory (SPA support)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/dist/index.html")); // Ensuring correct path to index.html
//  });
// connectMongo();

// app.get("/", (req, res) => {
//   res.send("Hello Abi!");
// });

// app.use("/User", userRoutes);
// app.use("/Admin", adminRoutes);
// app.use("/SuperAdmin", superAdminRoutes);
// app.use("/Services", servicesRoutes);
// app.use("/Document", documentRoutes);
// app.use("/Payments", paymentRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRoutes from "./Modules/User/Routes/userRoutes.js";
import adminRoutes from "./Modules/Admin/Routes/adminRoutes.js";
import superAdminRoutes from "./Modules/SuperAdmin/Routes/superAdminRoutes.js";
import documentRoutes from "./Modules/Document/Routes/documentRoutes.js";
import paymentRoutes from "./Modules/Payment/Routes/paymentRoutes.js";
import servicesRoutes from "./Services/Routes/servicesRoutes.js";
import connectMongo from "./config/mongoClient.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Simulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., for React frontend)
// ✅ Serve static files from React build folder
// app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// // ✅ Catch-all for SPA client-side routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});


// DB connection
connectMongo();

// API Routes
// app.get("/", (req, res) => {
//   res.send("Hello Abi!");
// });
  
app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);
app.use("/Services", servicesRoutes);
app.use("/Document", documentRoutes);
app.use("/Payments", paymentRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
