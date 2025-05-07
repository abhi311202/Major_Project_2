import { get_th1 } from "../Models/get_th1Model.js";

export const Fetch_Threshold1 = async (req, res) => {
  try {
    console.log("In get threshold controller");
    const th = await get_th1();
    console.log(th.id, th.threshold_value);

    return res.status(200).json({
      success: true,
      message: "Threshold fetching Secessful...",
      data: {
        threshold_id: th.id,
        threshold_value: th.threshold_value,
      },
    });
  } catch (error) {
    console.log("Error in Fetching Threshold: ", error);
    return res.status(500).json({
      message: "Threshol Fetching failed...",
      error: error.message || error,
    });
  }
};
