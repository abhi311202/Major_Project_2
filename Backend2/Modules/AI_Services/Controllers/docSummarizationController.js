import axios from "axios";

export const docSummarization = async (req, res) => {
  const { doc_id, doc_name, metadata, entities, pages } = req.body;
  if (!doc_id && !doc_name && !metadata && !entities && !pages) {
    // all fields are required
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  try {
    // const response = await axios.post("https://api.example.com/endpoint",req.body);
    // console.log(response.data);
    return res.status(200).json({
      message: "Document Summarization Successful!",
      data: doc_Summarization_Output,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const doc_Summarization_Output = {
  doc_id: 12345,
  doc_name: "New PDF_09_03_2025_Scanned(5).pdf",
  metadata: {},
  entities: {},
  pages: [
    {
      page_number: 1,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 2,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 3,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 4,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 5,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 6,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 7,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 8,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 9,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 10,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 11,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
    {
      page_number: 12,
      page_char_count: 0,
      page_token_count: 0,
      page_word_count: 1,
      page_sentence_count_raw: 1,
      text: "",
    },
  ],
  summarization:
    "To provide a detailed and structured summary of the legal document, I would need the actual content of the document. Please provide the text or key excerpts from the document that you would like summarized. Once I have the necessary information, I can proceed with creating a comprehensive summary following the guidelines you've outlined.",
};
