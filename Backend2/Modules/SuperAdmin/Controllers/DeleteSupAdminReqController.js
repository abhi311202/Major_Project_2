import {
  softDeleteSuperAdminRequest,
  getAdminInfo,
} from "../Models/DeleteSupAdminReqModel.js";
import client from "../../../config/sqlDB.js";
import { SuperAdminReqDeleteMailToAdmin } from "../Models/SuperAdminReqDeleteMailToAdminModel.js";

export const deleteSuperAdminRequest = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "request Id is required" });
  }
  try {
    client.query("BEGIN");
    const deleted = await softDeleteSuperAdminRequest(id);
    const adminInfo = await getAdminInfo(deleted.admin_id);
    await SuperAdminReqDeleteMailToAdmin(deleted.admin_id, id);
    // SuperAdminReqDeleteMailToAdmin
    client.query("COMMIT");
    res.status(200).json({
      message: "Request deleted successfully",
      request: deleted,
      email: adminInfo.email,
      username: adminInfo.username,
    });
  } catch (error) {
    client.query("ROLLBACK");
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
