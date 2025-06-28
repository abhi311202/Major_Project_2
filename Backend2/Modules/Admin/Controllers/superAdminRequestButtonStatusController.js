import { superAdminRequestButtonStatusModel } from "../Models/superAdminRequestButtonStatusModel.js";

export const superAdminRequestButtonStatusController = async (req, res) => {
  console.log("superAdminRequestButtonStatusController");
  const { adminId } = req.body;
  if (!adminId) {
    return res.status(400).json({ error: "adminId is required" });
  }
  try {
    const checkResult = await superAdminRequestButtonStatusModel(adminId);
    return res.status(200).json({
      status: checkResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message || error,
      message: "Internal Server Error",
    });
  }
};
