import axios from "axios";

export const docSearch = async (req, res) => {
  const { search_query, metadata, entities } = req.body;
  if (!search_query && !metadata && !entities) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    // const response = await axios.post("https://api.example.com/endpoint",req.body);
    // console.log(response.data);
    return res.status(200).json({
      message: "Document Searching Successful!",
      data: doc_Search_Output,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const doc_Search_Output = {
    "search_query": "give the important points.",
    "metadata": {},
    "entities": {},
    "search_result": [1, 2, 3]
};
