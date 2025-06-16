import { changeAdminPhone } from "../Models/changePhoneModel.js";
import client from "../../../config/sqlDB.js";
export async function changePhoneController(req, res) {
  try {
    const { id, currentPhone, newPhone } = req.body;
    if (!id || !currentPhone || !newPhone) {
      return res
        .status(400)
        .json({ error: "id, currentPhone, and newPhone are required" });
    }
    client.query("BEGIN");
    const result = await changeAdminPhone({ id, currentPhone, newPhone });
    if (result.success === true) {
      client.query("COMMIT");
      res.status(200).json({
        success: true,
        phone: result.phone,
      });
    } else {
      throw new Error("Error occured while updating Phone number.");
    }
  } catch (err) {
    client.query("ROLLBACK");
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
