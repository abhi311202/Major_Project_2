import { getAdminDetailsById } from "../Models/getAdminDetailsModel.js";

export const getAdminDetails = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            successful: false,
            error: "Admin id is required"
        });
    }
    const admin = await getAdminDetailsById(id);
    if (!admin) {
        return res.status(404).json({
            successful: false,
            error: "Admin not found"
        });
      }
      const { password_hash, is_active, is_delete, created_at, updated_at, deleted_at, ...adminWithoutPassword } = admin;
      res.status(200).json({
          successful: true,
          admin: adminWithoutPassword
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};