import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { profilePhotoUpload } from "../middlewares/user/profilePhotoUpload.js";

import { loginValidationHandler, loginValidator } from "../middlewares/login/loginValidator.js";
import { signupValidationHandler, signupValidator } from "../middlewares/user/userValidator.js";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", profilePhotoUpload, signupValidator, signupValidationHandler, async(req, res) => {
    //console.log("req.file:", req.file);  
    //console.log("req.body:", req.body);

    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.file) {
       newUser = {
          ...req.body,
          profilePhoto: req.file.filename,
          password: hashedPassword,
        };
    } else {
        newUser = {
          ...req.body,
          password: hashedPassword,
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

router.post("/login", loginValidator, loginValidationHandler, async(req, res) => {
    try{
        const user = await User.find({username: req.body.username});

        if(user.length > 0){
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if(isValidPassword){
                const userObj = {
                    username: user[0].username,
                    userId: user[0]._id,
                }
                const token = jwt.sign(userObj, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRY
                });

                
                res.cookie(process.env.COOKIE_NAME, token, {
                        maxAge: process.env.JWT_EXPIRY,
                        httpOnly: true,
                        signed: true,
                        secure: false,
                        
                });
                //res.cookie("helloHasib", "this is value");

                res.status(200).json({
                    user: userObj,
                })
                
                //res.status(200).send(userObj);
            }
            else{
                res.status(402).json({
                    passwordError: "password is not correct!",
                });
            }
        }
        else{
            res.status(402).json({ 
                usernameError:"username is not correct!"
            });
        }
    }catch(err){
        res.status(405).send("login failed from server!");
    }
});

export default router;