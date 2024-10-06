import express from "express";
import { profilePhotoUpload } from "../middlewares/user/profilePhotoUpload.js";

import { addUserValidationHandler, addUserValidator } from "../middlewares/user/userValidator.js";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", profilePhotoUpload, addUserValidator, addUserValidationHandler, async(req, res) => {
    console.log("req.file:", req.file);  
    console.log("req.body:", req.body);

    let newUser;
    if (req.file) {
       newUser = {
          ...req.body,
          profilePhoto: req.file.filename,
          //password: hashedPassword,
        };
    } else {
        newUser = {
          ...req.body,
          //password: hashedPassword,
        };
    }
    try{
        // const newUser = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     username: req.body.username,
        //     password: req.body.password,
    
        // };
    
        const user = await User.create(newUser);

        res.status(200).send("New user created!");
    }catch(err){
        console.log("error is here: ");
        console.log(err);
        res.status(401).send("there was a server side error ,hasib!");
    }
    
});

export default router;