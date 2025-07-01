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
    // const response = await axios.post("https://api.example.com/endpoint",req.body);
    // console.log(response.data);
    return res.status(200).json({
      message: "Entity Metada Extraction Successfull",
      data: entityMetadataExtractionOutput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const entityMetadataExtractionOutput = {
  doc_id: 12345,
  doc_name: "New PDF_09_03_2025_Scanned(5).pdf",

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
  metadata: {
    JUDGEMENT_AUTHOR: "",
    JUDGEMENT_TYPE: "",
    LANGUAGE_OF_JUDGEMENT: "ENGLISH",
    DATE_OF_HEARING: "",
    "DATE_OF_ORDER PRONOUNCEMENT": "09/03/2025",
    BENCH_COMPOSITION: "",
    "REFERRED ACTS": "",
  },
  entities: {
    "CASE_NO.": "",
    CASE_TYPE: "",
    CASE_STATUS: "",
    "FILING _DATE": "",
    "JUDGEMENT _DATE": "09/03/2025",
    "COURT_NO.": "",
    COURT_NAME: "",
    BENCH: "",
    "PETITIONER:": "",
    RESPONDENT: "",
    "ADV._OF_PETITIONER": "",
    "ADV._OF_RESPONDENT": "",
    PREVIOUS_CASE_CITATION: "",
    PENALTY_DETAIL: "",
    HEAD_NOTE: "",
  },
};
