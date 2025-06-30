import {
  createSuperAdminRequest,
  checkSuperAdminRequest,
  checkApprovedSuperAdminRequest,
} from "../Models/SupAdminReqModel.js";
import client from "../../../config/sqlDB.js";
import { sendEmailsTOSuperAdminsModel } from "../Models/sendEmailsTOSuperAdminsModel.js";

export const applyForSuperAdmin = async (req, res) => {
  const { adminId } = req.body;
  if (!adminId) {
    return res.status(400).json({ error: "adminId is required" });
  }
  try {
    const checkResult = await checkSuperAdminRequest(adminId);
    if (checkResult) {
      const checkResult1 = await checkApprovedSuperAdminRequest(adminId);
      if (checkResult1) {
        await client.query("BEGIN");
        const result = await createSuperAdminRequest(adminId);
        if (result.is_active) {
          // send email to all Super Admins
          await sendEmailsTOSuperAdminsModel(result.admin_id);
          await client.query("COMMIT");
          res.status(201).json({
            message: "Super Aadmin Request submitted",
            request: result,
          });
        } else {
          throw new Error("Failed to submit Super Admin request");
        }
      } else {
        await client.query("ROLLBACK");
        res.status(403).json({
          message:
            "Super Admin request already approved. You are already a super admin",
        });
      }
    } else {
      await client.query("ROLLBACK");
      res.status(403).json({
        message: "Super Admin request already exist in Pending Queue",
      });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      message: "Failed to submit Super Admin request !!",
      error: error.message,
    });
  }
};
