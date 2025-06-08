import { getSuperAdminDetailsById } from "../Models/getSuperAdminDetailsModel.js";

export const getSuperAdminDetails = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        successful: false,
        error: "SuperAdmin id is required"
      });
    }
    const superAdmin = await getSuperAdminDetailsById(id);
    if (!superAdmin) {
      return res.status(404).json({
        successful: false,
        error: "SuperAdmin not found"
      });
    }
    const { password_hash, is_active, is_delete, created_at, updated_at, deleted_at, ...superAdminWithoutPassword } = superAdmin;
    res.status(200).json({
      successful: true,
      superAdmin: superAdminWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};