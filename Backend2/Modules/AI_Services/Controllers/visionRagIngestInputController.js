import axios from "axios";

export const visionRagIngestInput = async (req, res) => {
  const { doc_id, doc_s3_uri } = req.body;
  if (!doc_id && !doc_s3_uri) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    // const response = await axios.post(
    //   "http://13.200.48.15:4000/summarize",
    //   req.body
    // );
    // console.log(response.data);
    return res.status(200).json({
      success: true,
      message: "Document Ingetion in Vision Rag Successful!",
      data: Vision_RAG_Ingest_Output,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message || error,
    });
  }
};

const Vision_RAG_Ingest_Output = {
  doc_id: 12345,
  doc_s3_name: "metals and non metals.pdf",
  vector_upload_count: 0,
  index_name: "indian-index",
  namespace: "new-delhi",
};
