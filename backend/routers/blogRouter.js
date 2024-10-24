import express from "express";

import { blogPhotoUpload } from "../middlewares/blog/blogPhotoUpload.js";
import { checkLogin } from "../middlewares/common/checkLogin.js";

import { Blog } from "../models/Blog.js";

const router = express.Router();

router.post("/", blogPhotoUpload, checkLogin, async(req, res) => {

    let newBlog;

    if(req.file){
        newBlog = {
            ...req.body,
            coverPhoto: req.file.filename,

        }
    }
    else{
        newBlog = {
            ...req.body,
        }
    }

    try{
        const blog = await Blog.create(newBlog);
        res.status(200).send("Blog created successfully!");
    }catch(err){
        console.log("err: ", err);
        res.status(401).send("there was a server side error on /blog/post!");
    }
})

export default router;