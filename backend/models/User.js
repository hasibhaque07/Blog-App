import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profilePhoto: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Blog",
            }
        ]
    },
    {
        timestamps: true,
    }
); 

export const User = mongoose.model("User", userSchema);