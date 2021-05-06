/** @module Config/Multer */
import fs from 'fs';
import path from 'path';
import multer from 'multer';

/** Specify the output directory. */
const fileDestination = path.join(process.env.PWD ?? '', 'uploads');

/** Create the output directory if it doesn't exist. */
fs.mkdirSync(fileDestination, { recursive: true });

/** Define Multer storage. You can set the file output destination and file
 * naming pattern here. */
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, fileDestination);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

/** Create a filter to only allow a number of file formats. */
const fileFilter = (req, file, callback) => {
    const fileName = file.originalname.toLowerCase();
    if (!fileName.match(/\.(txt|rtf|pdf|doc|docx|csv|jpg|jpeg|png|gif)$/)) {
        return callback(
            'Illegal file format! Allowed formats are txt, rtf, pdf, doc, docx, csv, jpg, jpeg, png, gif.'
        );
    }
    return callback(null, true);
};

/** Create a Multer instance. */
const fileUpload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 512 * 1024 * 1024,
    },
});

/** A middleware function that parses all the files sent in a field named
 * "attachments" e.g. <code>&lt;input type="file" name="attachments"
 * multiple/&gt;</code>. If parsing is successful, files can be accessed under
 * <i>req.files</i>. If there are no files attached, then <i>req.files</i> is
 * set to <i>undefined</i>.
 * ```typescript
 * const uploadController = (req, res) => {
 *   parseFiles(req, res, (error) => {
 *       if (error) {
 *           throw Error(filesError); // Parsing or validation error
 *       }
 *       const files = req.files; // Attached files or undefined
 * }
 * ```*/
export const parseFiles = fileUpload.array('attachments');
