import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    coverImage: {
        image: {
            type: String,
            trim: true
        },
        public_id: {
            type: String,
            trim: true
        }
    },
    avatar: {
        image: {
            type: String,
            trim: true
        },
        public_id: {
            type: String,
            trim: true
        }
    },
    watchHistory: [
        {
            video: {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        }
    ],
    googleId: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    accessToken: {
        type: String,
        trim: true
    },
    refreshToken: {
        type: String,
        trim: true
    },
    googleAccessToken: {
        type: String,
        trim: true
    },
    gootleRefreshToken: {
        type: String,
        trim: true
    },
    verificationToken: {
        type: String,
        trim: true
    },
    resetPasswordToken: {
        type: String,
        trim: true
    }
}, { timestamps: true });


const UserModel = new mongoose.model("User", userSchema);
export default UserModel;