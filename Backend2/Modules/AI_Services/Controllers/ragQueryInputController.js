import axios from "axios";

export const ragQueryInput = async (req, res) => {
  const { query, metadata, entities } = req.body;
  if (!query && !metadata && !entities) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    console.log(`http://${process.env.RAG}/query`);
    const response = await axios.post(
      `http://${process.env.RAG}/query`,
      req.body
    );
    // console.log(response.data);
    return res.status(200).json({
      success: true,
      message: "Query in Rag Successful!",
      data: response.data,
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

const RAG_Query_Output = {
  query: "give the important points.",
  result:
    'The case revolves around the interpretation of Section 24(2) of The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, particularly the meaning of "compensation has not been paid." The Supreme Court dismissed the appeals, emphasizing the provisions for compensation payment under the 1894 Act.\n\n1. **Section 24(2) Interpretation**: The case primarily deals with the interpretation of "compensation has not been paid" under Section 24(2) of the 2013 Act, which affects the lapse of land acquisition proceedings initiated under the 1894 Act (Page 3.0).\n\n2. **Compensation Payment**: For the purposes of Section 24(2), compensation is considered "paid" if it has been offered to the interested person and deposited in court under Section 31(2) of the 1894 Act (Page 6.0).\n\n3. **Section 31 of the 1894 Act**: This section mandates the Collector to tender payment of compensation to entitled persons or deposit it in court if prevented by certain contingencies (Page 6.0).\n\n4. **Dismissal of Appeals**: The appeals were dismissed without costs, as the court found it unnecessary to consider the merits of the impugned judgment (Page 8.0).\n\n5. **Non-Obstante Clause**: Section 24(1) of the 2013 Act, with its non-obstante clause, gives overriding effect to its provisions over other provisions of the Act, affecting the application of the 1894 Act (Page 5.0).\n\n6. **Amendment in Maharashtra**: An amendment in Maharashtra\'s Nagpur (City) section added "and costs if any" to the compensation provisions (Page 6.0).',
  metadata: {},
  entities: {},

  references: [
    {
      doc_name: "Supreme Court of India",
      page_number: [3, 5, 6, 8],
    },
    {
      doc_name: "high Court of India",
      page_number: [3, 5, 6, 8],
    },
    {
      doc_name: "bihar Court of India",
      page_number: [3, 5, 6, 8],
    },
  ],
};
