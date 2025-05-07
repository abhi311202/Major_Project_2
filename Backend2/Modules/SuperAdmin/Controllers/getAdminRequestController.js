import { getAdminRequests } from "../Models/getAdminRequestsModel.js";

export const adminRequest = async (req, res) => {
    try {
      const requests = await getAdminRequests();
  
      res.status(200).json({
        success: true,
        data: requests,
      });
    } catch (error) {
      console.error("Error fetching pending admin requests:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pending admin requests.",
      });
    }
  };