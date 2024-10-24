import { uploader } from "../../utilities/singleUploader.js";

export const  blogPhotoUpload = (req, res, next) =>{
  const upload = uploader(
    "blogPhotos",
    ["image/jpeg", "image/jpg", "image/png"],
    9000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.single('coverPhoto')(req, res, (err) => {
    if (err) {
      res.status(405).json({
        photoError: err.message,
        // {
        //   profilePhoto: {
        //     msg: err.message,
        //   },
        // },
      });
    } else {
      next();
    }
  });
}


