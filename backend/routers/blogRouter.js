import express from "express";

import { blogPhotoUpload } from "../middlewares/blog/blogPhotoUpload.js";
import { checkLogin } from "../middlewares/common/checkLogin.js";

import { Blog } from "../models/Blog.js";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/", blogPhotoUpload, checkLogin, async(req, res) => {

    let newBlog;

    if(req.file){
        newBlog = {
            ...req.body,
            coverPhoto: req.file.filename,
            user: req.userId,
        }
    }
    else{
        newBlog = {
            ...req.body,
            coverPhoto: "defaultCoverPhoto.jpg",
            user: req.userId,
        }
    }

    try{
        const blog = await Blog.create(newBlog);

        await User.updateOne({
            _id: req.userId
        },{
            $push: {
                blogs: blog._id,
            }
        })
        res.status(200).send("Blog created successfully!");
    }catch(err){
        console.log("err: ", err);
        res.status(401).send("there was a server side error on /blog/post!");
    }
})

router.get("/", checkLogin, async(req, res) => {
    try{
        const blogs = await Blog.find({ user: req.userId });
        res.status(201).json({
            message: "blogs got successfully",
            blogs: blogs,
        })
    }catch(err){
        console.log(err);
        res.status(401).send("server side error");
    }

})

export default router;