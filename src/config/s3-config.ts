import fs from 'fs';
import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv';

dotenv.config();

/** Create a new S3 instance. */
const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

/** Uploads a file to the S3 bucket. */
export const uploadFile = async (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME ?? '',
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
};

/** Downloads a file from the S3 bucket. */
export const getFileReadStream = async (fileKey: string) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME ?? '',
    };
    return s3.getObject(downloadParams).createReadStream();
};
