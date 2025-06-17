import { getAdminsToChatModel } from "../Models/getAdminsToChatModel.js";
export const getAdminsToChat = async (req, res) => {
  try {
    // get All Admins
    const admins = await getAdminsToChatModel();
    if (admins.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Active Admins Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Admins Found",
        admins: admins,
      });
    }
    console.log("Admins: " + admins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || error,
      note: "Error in fetching Active Admins",
    });
  }
};
