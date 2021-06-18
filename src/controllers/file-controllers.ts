/** @module Controllers/File */
import { Request, Response } from 'express';
import { getFileReadStream } from '../config/s3-config.js';

/** Sends a single binary file that has been uploaded to the S3 bucket. */
export const sendSingleFile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const fileKey = req.params.key;
        const readStream = await getFileReadStream(fileKey);
        readStream.pipe(res);
    } catch (error) {
        res.status(400).json({
            error: 'Could not find requested resource.',
        });
    }
};
