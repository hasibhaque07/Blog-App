// external imports
import { check, validationResult } from "express-validator";
import { unlink } from "fs";
import createError from "http-errors";
import path from "path";
import { fileURLToPath } from 'url';

// internal imports
import { User } from "../../models/User.js";

 // This line sets up __dirname in an ES module context
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

// add user
export const signupValidator = [

  check("name")  
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }), 
  check("username")
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isAlphanumeric("en-US", { ignore: "-_" }) // Allow letters, numbers, hyphens, and underscores
    .withMessage("Username must contain only letters, numbers, hyphens, or underscores")
    .trim(),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

export const signupValidationHandler = (req, res, next)  =>{
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  // console.log(mappedErrors);
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.file) {
      const { filename } = req.file;
      unlink(
        path.join(__dirname, `../../public/uploads/profilePhotos/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};


