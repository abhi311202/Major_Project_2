import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Modules/User/Routes/userRoutes.js";
import adminRoutes from "./Modules/Admin/Routes/adminRoutes.js";
import superAdminRoutes from "./Modules/SuperAdmin/Routes/superAdminRoutes.js";
import servicesRoutes from "./Services/Routes/servicesRoutes.js";
import cookieParser from "cookie-parser";
import connectMongo from "./config/mongoClient.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT || 4000;

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello Abi!");
});

app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);
app.use("/Services",servicesRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
