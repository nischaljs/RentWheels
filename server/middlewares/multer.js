const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = String(req.user.userId);
    const type = req.type;

    // Log to check the values
    console.log('userId:', userId);
    console.log('type:', type);

    // Define the directory path
    const dir = path.join('public', type, userId);

    // Check if the directory exists, if not, create it
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return cb(err); // Pass the error to multer if directory creation fails
      }
      cb(null, dir); // Pass the directory path to multer
    });
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp + original filename
  }
});


// File filtering: Allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Set file size limit to 5MB
  fileFilter: fileFilter
});

module.exports = upload;
