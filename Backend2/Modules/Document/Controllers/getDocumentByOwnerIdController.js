import { getDocumentByOwnerIdModel } from "../Models/getDocumentByOwnerIdModel.js";
export async function getDocumentsByOwnerIdController(req, res) {
  const owner_id = req.body.owner_id;
  if (!owner_id) {
    return res
      .status(400)
      .json({ success: false, error: "Owner ID is required" });
  }

  const result = await getDocumentByOwnerIdModel(owner_id);
  if (result.success) {
    res.status(200).json({ success: true, documents: result.documents });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
}
