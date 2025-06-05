import { getProfileDataById } from "../Models/getProfileDataModel.js";

export const getProfileDataController = async (req, res) => {
  const { id } = req.body;
  console.log(id, "id");
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    console.log(id, "id1");
    const userData = await getProfileDataById(id);
    console.log(userData, "userData");
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error: error.message });
  }
};
