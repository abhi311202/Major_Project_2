import {
  approveSuperAdminRequest,
  getAdminID,
  getAdminData,
  putSuperAdminData,
  deactivateAdmin,
} from "../Models/ApproveSupAdminReqModel.js";
import client from "../../../config/sqlDB.js";

export const approveSuperAdminRequestController = async (req, res) => {
  const { requestId, superAdminId } = req.body;
  if (!requestId) {
    return res.status(400).json({ error: "requestId is required" });
  }
  try {
    client.query("BEGIN");
    const adminid = await getAdminID(requestId);
    const adminData = await getAdminData(adminid);
    const superAdminStatus = await putSuperAdminData(adminData, superAdminId);
    const adminStatus = await deactivateAdmin(adminid);
    const requestStatus = await approveSuperAdminRequest(requestId);
    if (superAdminStatus && !adminStatus && requestStatus) {
      client.query("COMMIT");
      return res.status(200).json({
        message: "Request approved successfully",
        email: adminData.email,
        username: adminData.username,
      });
    }
    client.query("ROLLBACK");
    return res.status(400).json({ error: "Request not approved" });
  } catch (error) {
    client.query("ROLLBACK");
    res.status(500).json({
      message: "Request not approved, Please try Again",
      error: error.message,
    });
  }
};
