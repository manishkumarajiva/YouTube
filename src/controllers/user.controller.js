import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import SendEmail from "../utils/ses.util.js";
import Bcrypt from "bcryptjs";
import msg from "../config/message.js";

// --------------- User's Handlers --------------- START

const RegisterUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if([fullname, username, email, password].some((field) => field.trim() === "")){
        throw new ErrorHandler(401, msg.payload);
    }

    const existedUser = await UserModel.findOne({ $or : [{username},{email}]});
    if(existedUser){
        return res.status(200).json(new ResponseHandler(409, msg.alexist));
    }

    // Avatar
    const avatarLocalPath = req.files.avatar[0]?.filename;
    if(!avatarLocalPath){
        return res.status(200).json(new ResponseHandler(401, "Avatar is required"));
    }

    const avatarLocal = new Object({
        filename : req.files.avatar[0]?.filename,
        url : "http://localhost:8000/public/upload/avatar/"
    })
    

    // CoverImage
    let bannerFile;  let bannerLocal;
    if(req.files && Array.isArray(req.files.banner) && req.files.banner[0]?.filename){
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
        return res.status(200).json(new ErrorHandler(500, msg.fregister));
    }

    const mailOptions = {
        from: "manishkumarajiva@gmail.com",
        to: email,
        subject : `Hi ${fullname}, Your Registeration is successfully completed`,
        html : `<h1> Username : ${username} | Password ${password} </h1>`
    };

    const emailResp = await SendEmail(mailOptions);

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

    if(!(fullname || username)){
        return res.status(200).json(new ErrorHandler(400, msg.payload));
    }

    const updateUser = await UserModel.findByIdAndUpdate(
        req.user?._id,
        { fullname : fullname, username : username },
        { new : true }
    )

    return res
    .status(200)
    .json(new ResponseHandler(200, updateUser, msg.supdate));
});


const UpdateUserCoverImage = asyncHandler(async (req, res) => {

    if(! (req.file && req.file?.filename)){
      return res.status(200).json(ErrorHandler(401, "Please Select YouTube Banner"));
    }

    // Local Handling
    const UserProfile = await UserModel.findById({ _id : req.user?._id })

    const OldBanner = UserProfile.banner.url + UserProfile.banner.name;

    const NewBanner = new Object({
        filename : req.file?.filename,
        url : "http://localhost:8000/public/upload/banner/"
    })

    const UpdateBanner = await UserModel.findByIdAndUpdate(
        { _id : req.user?._id },
        { banner : NewBanner },
        { new : true }
    )

    if(!UpdateBanner){
        return res.status(200).json(new ErrorHandler(400, msg.fupdate));
    }

    // const RemovePreviousAvatar = fs.unlinkSync(OldBanner);

    // Cloudinary


    return res
    .status(200)
    .json(new ResponseHandler(201, UpdateBanner, msg.supdate));
});


const UpdateUserAvatar = asyncHandler(async (req, res) => {

    if(! (req.file && req.file.filename)){
        throw new ErrorHandler(401, "Please Select Profile Avatar")
    }

    // Local Handling
    const UserProfile = await UserModel.findById({ _id : req.user?._id })

    const OldAvatar = UserProfile.avatar.url + UserProfile.avatar.name;

    const NewAvatar = new Object({
        filename : req.file.filename,
        url : "http://localhost:8000/public/upload/avatar/"
    })

    const UpdateAvatar = await UserModel.findByIdAndUpdate(
        { _id : req.user?._id },
        { avatar : NewAvatar },
        { new : true }
    )

    if(!UpdateAvatar){
        return res.status(200).json(new ErrorHandler(400, msg.fupdate));
    }

    // const RemovePreviousAvatar = fs.unlinkSync(OldAvatar);
    // Cloudinary


    return res
    .status(200)
    .json(new ResponseHandler(201, UpdateAvatar, msg.supdate));
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