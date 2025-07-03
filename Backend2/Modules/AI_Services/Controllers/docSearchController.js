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
    // console.log(`http://13.127.253.239:5003/search`);
    const response = await axios.post(
      `http://${process.env.SEARCH}/search`,
      req.body
    );
    // console.log(response.data);
    return res.status(200).json({
      message: "Document Searching Successful!",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
