const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");



const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname = "image" + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      
      return cb(new Error('הקובץ חייב להיות בפורמטים הבאים: (png, jpg, jpeg)'), false);
    }
    const fileSize = parseInt(req.headers["content-length"]);

    if (fileSize > 2 * 1024 * 1024)//2MB

     {
      return cb(new Error('הקובץ חורג מהגודל המרבי המותר של 2MB'), false);
    }

    cb(null, true);
  }
});




const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = decodedToken;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

module.exports = {
  upload,
  verifyToken
};


//max 2mb
//file jpg, png, jpeg
//mime type
//premiision db
//ci cd 