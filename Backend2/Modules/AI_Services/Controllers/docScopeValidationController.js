import axios from "axios";

export const docScopeValidation = async (req, res) => {
  const { doc_id, doc_name, metadata, entities, repetition, pages } = req.body;
  if (!doc_id && !doc_name && !metadata && !entities && !repetition && !pages) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    const response = await axios.post(
      "http://13.200.48.15:6000/doc-validation",
      req.body
    );
    // console.log(response.data.validation_score * 100);
    return res.status(200).json({
      message: "Document Scope Validation Successful!",
      threshold: response.data.validation_score * 100,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
