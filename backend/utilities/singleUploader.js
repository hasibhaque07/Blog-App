// external imports
import createError from "http-errors";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

export const  uploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  

  // This line sets up __dirname in an ES module context
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  // `${__dirname}/../public/uploads/${subfolder_path}/`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}


