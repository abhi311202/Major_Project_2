import { softDeleteSuperAdminRequest } from "../Models/DeleteSupAdminReqModel.js";

export const deleteSuperAdminRequest = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "request Id is required" });
  }
  try {
    const deleted = await softDeleteSuperAdminRequest(id);
    res.json({ message: "Request deleted successfully", request: deleted });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};