import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
export const docSummarization = async (req, res) => {
  const { doc_id, doc_name, metadata, entities, pages } = req.body;
  if (!doc_id && !doc_name && !metadata && !entities && !pages) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    console.log(`http://${process.env.SUMMARY}/summarize`);
    const response = await axios.post(
      `http://${process.env.SUMMARY}/summarize`,
      req.body
    );
    // console.log(response.data);
    return res.status(200).json({
      message: "Document Summarization Successful!",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
