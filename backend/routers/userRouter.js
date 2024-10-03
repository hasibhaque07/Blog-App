import express from "express";
import { User } from "../models/User.js";

const router = express.Router();
//profilePhotoUpload,
router.post("/signup", async(req, res) => {
    // console.log("req.files:", req.files);

    // let newUser;
    // if (req.files && req.files.length > 0) {
    //    newUser = {
    //       ...req.body,
    //       profilePhoto: req.files[0].filename,
    //       //password: hashedPassword,
    //     };
    // } else {
    //     newUser = {
    //       ...req.body,
    //       //password: hashedPassword,
    //     };
    // }
    try{
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
    
        };
    
        const user = await User.create(newUser);

        res.status(200).send("New user created!");
    }catch(err){
        console.log("error is here: ");
        console.log(err);
        res.status(401).send("there was a server side error!");
    }
    
});

export default router;