import axios from "axios";

export const entityMetadataExtraction = async (req, res) => {
  const { doc_id, doc_name, metadata, entities, pages } = req.body;
  if (!doc_id && !doc_name && !metadata && !entities && !pages) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }

  try {
    const response = await axios.post(
      "http://13.200.48.15:7000/entity-metadata",
      req.body
    );
    // console.log(response.data);
    return res.status(200).json({
      message: "Entity Metada Extraction Successfull",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
