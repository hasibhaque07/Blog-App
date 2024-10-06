import { uploader } from "../../utilities/singleUploader.js";

export const  profilePhotoUpload = (req, res, next) =>{
  const upload = uploader(
    "profilePhotos",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.single('profilephoto')(req, res, (err) => {
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


