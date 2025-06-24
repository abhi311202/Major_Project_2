import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Modules/User/Routes/userRoutes.js";
import adminRoutes from "./Modules/Admin/Routes/adminRoutes.js";
import superAdminRoutes from "./Modules/SuperAdmin/Routes/superAdminRoutes.js";
import documentRoutes from "./Modules/Document/Routes/documentRoutes.js";
import paymentRoutes from "./Modules/Payment/Routes/paymentRoutes.js";
import servicesRoutes from "./Services/Routes/servicesRoutes.js";
import cookieParser from "cookie-parser";
import connectMongo from "./config/mongoClient.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const port = process.env.PORT || 4000;

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello Abiiii!");
});

app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);
app.use("/Services", servicesRoutes);
app.use("/Document", documentRoutes);
app.use("/Payments", paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
