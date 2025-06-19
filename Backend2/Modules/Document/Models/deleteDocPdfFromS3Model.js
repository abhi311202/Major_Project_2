// deleteDocPdfFromS3

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const deleteDocPdfFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
  };
  await s3.send(new DeleteObjectCommand(params));
  return { message: "File deleted successfully", fileKey };
};
