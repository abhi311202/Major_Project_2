import { changeProfilePhoto } from "../Models/changeProfilePhotoModel.js";

export async function changeProfilePhotoController(req, res) {
  try {
    const { id, profile_picture_url, profile_picture_key } = req.body;
    if (!id || !profile_picture_url || !profile_picture_key) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "id, profile_picture_url, and profile_picture_key are required",
        });
    }
    const updated = await changeProfilePhoto({
      id,
      profile_picture_url,
      profile_picture_key,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
