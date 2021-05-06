import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    const fileName = file.originalname.toLowerCase();
    if (!fileName.match(/\.(txt|rtf|pdf|doc|docx|csv|jpg|jpeg|png|gif)$/)) {
        req.fileValidationError =
            'Illegal file format! Allowed formats are txt, rtf, pdf, doc, docx, csv, jpg, jpeg, png, gif.';
        return callback();
    }
    return callback(null, true);
};

export const fileUpload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 512 * 1024 * 1024,
    } /** Max file size allowed is 512 megabytes. */,
});
