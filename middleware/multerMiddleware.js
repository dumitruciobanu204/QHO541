const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/img/',
    filename: (req, file, callback) => {
        const { title } = req.body;
        const newFileName = title.toLowerCase().replace(/\s+/g, '_') + '.jpg';
        callback(null, newFileName);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(new Error('Only JPG files allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;