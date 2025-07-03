import axios from "axios";

export const visionRagQueryInput = async (req, res) => {
  const { query } = req.body;
  if (!query) {
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
      message: "Query in Vision Rag Document Successful!",
      data: Vision_RAG_Query_Output,
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

const Vision_RAG_Query_Output = {
  query: "give the important points.",

  references: [
    {
      doc_id: 1,
      page_number: [3, 5, 6, 8],
    },
    {
      doc_id: 1,
      page_number: [3, 5, 6, 8],
    },
    {
      doc_id: 1,
      page_number: [3, 5, 6, 8],
    },
  ],
};
