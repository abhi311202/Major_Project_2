import { removeProfilePhoto } from "../Models/removeProfilePhotoModel.js";

export async function removeProfilePhotoController(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "User id is required" });
    }
    const result = await removeProfilePhoto({ id });
    if (result) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}