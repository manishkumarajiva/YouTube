import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";



// --------------- User's Handlers --------------- START

const RegisterUser = asyncHandler(async (req, res) => {

});


const GetCurrentUser = asyncHandler(async (req, res) => {

});


const UpdateUserAccountDetails = asyncHandler(async (req, res) => {

});


const UpdateUserCoverImage = asyncHandler(async (req, res) => {

});


const UpdateUserAvatar = asyncHandler(async (req, res) => {

});


const GetWatchHistory = asyncHandler(async (req, res) => {

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