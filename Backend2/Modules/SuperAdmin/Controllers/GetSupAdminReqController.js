import { getAllSuperAdminRequests } from "../Models/GetSupAdminReqModel.js";

export const getSuperAdminRequests = async (req, res) => {
  try {
    const requests = await getAllSuperAdminRequests();

    if (!requests || requests.length === 0) {
      res.status(404).json({
        success: "true",
        message: "No Pending Admin found",
      });
    } else {
      res.json({
        success: "true",
        data: requests,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
