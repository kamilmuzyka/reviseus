/** @module Config/Multer */
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';

/** Specify the output directory. */
const fileDestination = 'uploads';

/** Define the output directory and set file names pattern. Every file goes into
 * the user's directory (named same as the user ID). File names are randomly
 * generated UUIDs. Original file names should be saved in the database along
 * with the path to a file. */
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const userFileDestination = path.join(fileDestination, req.user.userId);
        fs.mkdirSync(userFileDestination, { recursive: true });
        callback(null, userFileDestination);
    },
    filename: (req, file, callback) => {
        callback(null, `${v4() + path.extname(file.originalname)}`);
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
