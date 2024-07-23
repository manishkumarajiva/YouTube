import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import SendEmail from "../utils/ses.util.js";
import Bcrypt from "bcryptjs";
import msg from "../config/message.js";
import {CloudinaryUpload, CloudinaryDelete } from "../utils/cloudinary.util.js";


// --------------- User's Handlers --------------- START


const RegisterUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if([fullname, email, password].some((field) => field.trim() === "")){
        return res.status(200).json(new ErrorHandler(401, msg.payload));
    }

    const existedUser = await UserModel.findOne({ email });
    if(existedUser){
        return res.status(200).json(new ResponseHandler(409, msg.alexist));
    }


    const hashedPassword = await Bcrypt.hash(password,12);

    const createUser = await UserModel.create({
        fullname : fullname,
        username : `@${fullname.split(" ")[0].toLowerCase()}`,
        email : email.toLowerCase(),
        password : hashedPassword
    })

    if(!createUser){
        return res.status(200).json(new ErrorHandler(500, msg.fregister));
    }

    // const mailOptions = {
    //     from: "manishkumarajiva@gmail.com",
    //     to: email,
    //     subject : `Hi ${fullname}, Your Registeration is successfully completed`,
    //     html : `<h1> Username : ${username} | Password ${password} </h1>`
    // };

    // const emailResp = await SendEmail(mailOptions);

    return res
    .status(201)
    .json(new ResponseHandler(200, createUser, msg.sregister));
});


const GetCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const userProfile = await UserModel.findById({ _id : userId });

    if(!userProfile){
        return res.status(200).json(new ErrorHandler(500, "User Not Fount"));
    }

    return res
    .status(200)
    .json( new ResponseHandler(200, userProfile, "Successfully Fetched"))
});


const UpdateUserAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, username } = req.body;

    if(!username){
        return res.status(200).json(new ErrorHandler(400, msg.payload));
    }

    const usernameExist = await UserModel.findOne({ username : username });

    if(usernameExist){
        return res.status(200).json(new ErrorHandler(400, msg.alexist));
    }

    const usernameUpdate = await UserModel.findByIdAndUpdate(
        req.user?._id,
        { fullname : fullname, username : username },
        { new : true }
    )

    return res
    .status(200)
    .json(new ResponseHandler(200, usernameUpdate, msg.supdate));
});


const UpdateUserCoverImage = asyncHandler(async (req, res) => {

    if(! (req.file && req.file?.filename)){
      return res.status(200).json(ErrorHandler(401, "Please Select Background Banner"));
    }

    const UserProfile = await UserModel.findById({ _id : req.user?._id });

    const desgination = {
        path: req.file?.path,
        type: "image",
        folder: "/DevHub/Banner/"
    }

    const NewBanner = await CloudinaryUpload(desgination);

    const UpdateBanner = await UserModel.findByIdAndUpdate(
        { _id : req.user?._id },
        { banner : NewBanner.secure_url },
        { new : true }
    )

    if(!UpdateBanner){
        return res.status(200).json(new ErrorHandler(400, msg.fupdate));
    }

    return res.status(200).json(new ResponseHandler(201, UpdateBanner, msg.supdate));
});


const UpdateUserAvatar = asyncHandler(async (req, res) => {

    if(! (req.file && req.file.filename)){
        throw new ErrorHandler(401, "Please Select Profile Avatar");
    }

    const UserProfile = await UserModel.findById({ _id : req.user?._id });

    if(UserProfile.avatar.trim() !== ""){
        const filepath = UserProfile.avatar.split("DevHub")[1];
        await CloudinaryDelete(filepath);
    }

    const desgination = {
        path: req.file?.path,
        type: "image",
        folder: "/DevHub/Avatar/"
    }

    const NewAvatar = await CloudinaryUpload(desgination);
    console.log(NewAvatar,"UPLOAD");
    const UpdateAvatar = await UserModel.findByIdAndUpdate(
        { _id : req.user?._id },
        { avatar : NewAvatar.url },
        { new : true }
    )

    if(!UpdateAvatar){
        return res.status(200).json(new ErrorHandler(400, msg.fupdate));
    }

    return res.status(200).json(new ResponseHandler(201, UpdateAvatar, msg.supdate));
});


const GetWatchHistory = asyncHandler(async (req, res) => {
    
    const WatchHistory = await UserModel.findById({ _id : req.user?._id })

    if(WatchHistory.length < 1){
        return res.status(200).json(new ErrorHandler(400, msg.fread));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, WatchHistory, msg.sread));
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