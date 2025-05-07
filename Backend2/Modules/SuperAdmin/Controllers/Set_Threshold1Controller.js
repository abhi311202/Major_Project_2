import { set_th1 } from "../Models/set_th1Model.js";
import { del_th1 } from "../Models/del_th1Model.js";

export const Set_Threshold1 = async (req, res) => {
  try {
    const { threshold_id, threshold_value, super_admin_id } = req.body;
    console.log(threshold_id, threshold_value, super_admin_id);

    const th = await set_th1(threshold_value, super_admin_id);

    if (th) {
      const dth = await del_th1(threshold_id);
      if (dth) {
        return res.status(200).json({
          success: true,
          message: "New Threshold Set Sucessfully...",
          data: {
            id: th,
          },
        });
      } else {
        throw new Error("Error in deleting previous threshold value");
      }
    } else {
      throw new Error("Error in Setting new threshold value");
    }
  } catch (error) {
    // rollback logic....

    console.log("Error in Setting Threshold: ", error);
    return res.status(500).json({
      success: false,
      message: "Setting new threshold failed",
      error: error.message || error,
      data: {},
    });
  }
};
