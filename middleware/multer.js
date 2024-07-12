import multer from "multer";
import fs from "fs";
import path from "path";

//storage deceleration
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const imageFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const images = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

//video upload
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/videos";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const videoFilter = (req, file, cb) => {
  const fileTypes = /mp4|avi|mkv/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    const error = new Error("Only videos are allowed");
    error.code = "INVALID_FILE_TYPE";
    cb(error);
  }
};

export const videos = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
});
