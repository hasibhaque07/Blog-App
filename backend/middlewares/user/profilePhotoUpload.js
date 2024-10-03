import { uploader } from "../../utilities/singleUploader.js";

export const  profilePhotoUpload = (req, res, next) =>{
  const upload = uploader(
    "profilePhotos",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(401).json({
        errors: err.message,
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


