import {getDocumentById} from "../Models/getDocumentByIdModel.js"
export async function getDocumentByIdController(req, res) {
  const documentId = req.body.id;
  if (!documentId) {
    return res.status(400).json({ success: false, error: "Document ID is required" });
  }

  const result = await getDocumentById(documentId);
  if (result.success) {
    res.status(200).json({ success: true, documents: result.documents });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
}
