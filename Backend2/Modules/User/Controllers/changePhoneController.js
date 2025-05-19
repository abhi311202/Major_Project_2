import { changeUserPhone } from "../Models/changePhoneModel.js";

export async function changePhoneController(req, res) {
  try {
    const { id, currentPhone, newPhone } = req.body;
    if (!id || !currentPhone || !newPhone) {
      return res
        .status(400)
        .json({ error: "id, currentPhone, and newPhone are required" });
    }
    const result = await changeUserPhone({ id, currentPhone, newPhone });
    res.status(200).json({
      success: true,
      phone: result.phone,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}
