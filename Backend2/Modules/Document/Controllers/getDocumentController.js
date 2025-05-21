import { getDocuments } from "../Models/getDocumentModel.js";

export async function getDocumentController(req, res) {
    const result = await getDocuments();
    if (result.success) {
        res.status(200).json({ success: true, documents: result.documents });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
}