import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Bcrypt from "bcryptjs";
import fs from 'fs';

// --------------- User's Handlers --------------- START

const RegisterUser = asyncHandler(async (req, res) => {

    const { fullname, username, email, password } = req.body;

    if([fullname, username, email, password].some((field) => field.trim() === "")){
        throw new ErrorHandler(401, "All fields are required");
    }

    const existedUser = await UserModel.findOne({ $or : [{username},{email}]});
    if(existedUser){
        return res.status(200).json(new ResponseHandler(409, "User with Email or Username Already Exist"));
    }

    // Avatar
    const avatarLocalPath = req.files.avatar[0]?.path;
    if(!avatarLocalPath){
        return res.status(200).json(new ResponseHandler(401, "Avatar is required"));
    }

    const avatarLocal = new Object({
        filename : req.files.avatar[0]?.filename,
        url : "http://localhost:8000/public/upload/avatar/"
    })
    
    // CoverImage
    let bannerFile;  let bannerLocal;
    if(req.files && Array.isArray(req.files.banner)){
        bannerFile = req.files.banner[0]?.filename;

        bannerLocal = new Object({
            filename : bannerFile,
            url : "http://localhost:8000/public/upload/banner/"
        })
    }



    const hashedPassword = await Bcrypt.hash(password,12);

    const createUser = await UserModel.create({
        fullname : fullname,
        username : username.toLowerCase(),
        email : email.toLowerCase(),
        password : hashedPassword,
        avatar : avatarLocal,
        banner : bannerLocal
    })

    if(!createUser){
        throw new ErrorHandler(500, "Something went wrong during Registeration");
    }

    return res
    .status(201)
    .json(new ResponseHandler(200, createUser, "User Register Successfully"));
});


const GetCurrentUser = asyncHandler(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);
    const userProfile = await UserModel.findById({ _id : userId });

    if(!userProfile){
        throw new ErrorHandler(500, "User Not Fount");
    }

    return res
    .status(200)
    .json( new ResponseHandler(200, userProfile, "Successfully Fetched"));
});


const UpdateUserAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;

    if(!fullname || !email){
        throw new ErrorHandler(400, "All fields are required");
    };

    const updateUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        { fullname : fullname, email : email },
        { new : true }
    ).select("-password");

    return res
    .status(200)
    .json(new ResponseHandler(200, updateUser, "User Update Successfully"));
});


const UpdateUserCoverImage = asyncHandler(async (req, res) => {

    if(! (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage[0].filename)){
        throw new ErrorHandler(401, "Please Select Profile Avatar")
    }

    // Local Handling
    const UserProfile = await UserModel.findById({ _id : req.user._id })

    const OldCoverImage = UserProfile.coverImage.url + UserProfile.coverImage.name;

    const NewCoverImage = new Object({
        name : req.files.coverImage[0].filename,
        url : "http://localhost:8000/public/upload/converImage/"
    })

    const UpdateCoverImage = await UserModel.findByIdAndUpdate(
        { _id : req.user._id },
        NewCoverImage,
        { new : true }
    )

    if(!UpdateCoverImage){
        throw new ErrorHandler(400, "Failed to Update")
    }

    const RemovePreviousAvatar = fs.unlinkSync(OldCoverImage);

    // Cloudinary


    return res
    .status(200)
    .json(new ResponseHandler(201, UpdateCoverImage, "Update Successfully"))
    
});


const UpdateUserAvatar = asyncHandler(async (req, res) => {

    if(! (req.files && Array.isArray(req.files.avatar) && req.files.avatar[0].filename)){
        throw new ErrorHandler(401, "Please Select Profile Avatar")
    }

    // Local Handling
    const UserProfile = await UserModel.findById({ _id : req.user._id })

    const OldAvatar = UserProfile.avatar.url + UserProfile.avatar.name;

    const NewAvatar = new Object({
        name : req.files.avatar[0].filename,
        url : "http://localhost:8000/public/upload/avatar/"
    })

    const UpdateAvatar = await UserModel.findByIdAndUpdate(
        { _id : req.user._id },
        NewAvatar,
        { new : true }
    )

    if(!UpdateAvatar){
        throw new ErrorHandler(400, "Failed to Update")
    }

    const RemovePreviousAvatar = fs.unlinkSync(OldAvatar);
    // Cloudinary


    return res
    .status(200)
    .json(new ResponseHandler(201, UpdateAvatar, "Update Successfully"))
});


const GetWatchHistory = asyncHandler(async (req, res) => {
    
    const WatchHistory = await UserModel.findById({ _id : req.user._id })

    if(WatchHistory.length < 1){
        throw new ErrorHandler(400, "Empty")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, WatchHistory, "Successfully Fetch"))
});

// --------------- User's Handlers --------------- END


// Export User Handlers
export { 
    RegisterUser, 
    GetCurrentUser, 
    UpdateUserAccountDetails,
    UpdateUserCoverImage,
    UpdateUserAvatar,
    GetWatchHistory
};