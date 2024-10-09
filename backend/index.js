import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from "./routers/userRouter.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// This line sets up __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use('/uploadFolder', express.static(path.join(__dirname, './public/uploads/')));
 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));

app.get("/", (req, res) => {
    res.status(200).send("Hello there!");
});

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Database connected!");

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/user", userRouter);

const notFoundHandle = (req, res, next) => {
    res.status(404).send("Your requested content was not found!")
};

const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    } 
    else{
        res.status(500).json({error: err.message});
    }
};
app.use(notFoundHandle);
app.use(errorHandler);