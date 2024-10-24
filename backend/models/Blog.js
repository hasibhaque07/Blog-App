import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: true,
        },
        blogContent: {
            type: String,
            required: true,
        },
        coverPhoto: {
            type: String,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = mongoose.model("Blog", blogSchema);