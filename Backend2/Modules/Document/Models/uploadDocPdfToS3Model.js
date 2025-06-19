// uploadDocPdfToS3

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadDocPdfToS3 = async (file) => {
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `Document/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  await s3.send(new PutObjectCommand(s3Params));
  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;
  return { fileUrl, fileKey: s3Params.Key };
};
