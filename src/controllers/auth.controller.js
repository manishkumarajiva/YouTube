import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";



// --------------- Auth's Handlers --------------- START

const LoginAuthentication = asyncHandler(async (req, res) => {

});


const LogoutAuthentication = asyncHandler(async (req, res) => {

});


const UpdateCurrentPassword = asyncHandler(async (req, res) => {

});


const ResetUserPassword = asyncHandler(async (req, res) => {

});


const RefreshAccessToken = asyncHandler(async (req, res) => {

});

// --------------- Auth's Handlers --------------- END



// Export Auth Handlers
export {
    LoginAuthentication,
    LogoutAuthentication, 
    UpdateCurrentPassword,
    ResetUserPassword,
    RefreshAccessToken
};