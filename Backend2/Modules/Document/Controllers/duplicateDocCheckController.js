import { duplicateDocCheckModel } from "../Models/duplicateDocCheckModel.js";

export const duplicateDocCheckController = async (req, res) => {
  const { DocHash } = req.body;
  try {
    const duplicateDoc = await duplicateDocCheckModel(DocHash);
    return res.status(200).json({
      success: true,
      proceed_for_upload: duplicateDoc,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
