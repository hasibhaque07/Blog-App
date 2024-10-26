import express from "express";

import { blogPhotoUpload } from "../middlewares/blog/blogPhotoUpload.js";
import { checkLogin } from "../middlewares/common/checkLogin.js";

import { unlink } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { Blog } from "../models/Blog.js";
import { User } from "../models/User.js";

// This line sets up __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

router.put("/:id", blogPhotoUpload, async(req, res) => {

    const {id} = req.params;

    try{
        const blog = await Blog.findById(id);

        if(!blog) res.status(401).send("Todo not found");

        // remove cover Photo if any
        if (blog.coverPhoto) {
            unlink(
            path.join(__dirname, `../public/uploads/blogPhotos/${blog.coverPhoto}`),
            (err) => {
                if (err) console.log(err);
            }
            );
        }

        const updatedBlog = {
            ...req.body,
        };

    
        if (req.file) {
            updatedBlog.coverPhoto = req.file.filename;
        }

        await Blog.updateOne({ _id: id }, { $set: updatedBlog });
        res.status(200).send("Blog updated successfully!");
    }catch(err){
        console.log(err);
        res.status(401).send("server side error!");
    }
})

router.delete("/:id", async(req, res) => {
    const { id } = req.params;

    try{
        const blog = await Blog.findByIdAndDelete(id);

        if(!blog){
            res.status(401).send("Blog not found!");
        }

        // remove cover Photo if any
        if (blog.coverPhoto) {
            unlink(
            path.join(__dirname, `../public/uploads/blogPhotos/${blog.coverPhoto}`),
            (err) => {
                if (err) console.log(err);
            }
            );
        }
        res.status(200).send("Blog deleted successfully");
    }catch(err){
        console.log(err);
        res.status(401).send("server side error!");
    }
})

export default router;