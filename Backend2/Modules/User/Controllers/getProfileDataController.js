import { getProfileDataById } from "../Models/getProfileDataModel.js";

export const getProfileDataController = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const userData = await getProfileDataById(id);
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};