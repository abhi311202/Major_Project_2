import {
  softDeleteSuperAdminRequest,
  getAdminInfo,
} from "../Models/DeleteSupAdminReqModel.js";

export const deleteSuperAdminRequest = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "request Id is required" });
  }
  try {
    const deleted = await softDeleteSuperAdminRequest(id);
    const adminInfo = await getAdminInfo(deleted.admin_id);
    res.status(200).json({
      message: "Request deleted successfully",
      request: deleted,
      email: adminInfo.email,
      username: adminInfo.username,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
