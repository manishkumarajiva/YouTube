import JWT from 'jsonwebtoken';
import UserModel from "../models/user.model.js";



// Access Token
const AccessToken = async (user) => {
    return Promise((resolve, reject) => {

        const payload = {
            id : user._id,
            email : user.email,
            name : user.name
        };
    
        const optons = {
            issuer : "Manish Leo",
            expiresIn : "1d"
        };
    
        const secrectKey = process.env.YOUTUBE_SECRECT_KEY;
    
        JWT.sign(payload, secrectKey, optons, (error, token) => {
            if(error) throw error;
            resolve(token);
        });
    });
};


// Verify Token
const VerifyToken = async (err, req, res, next) => {
    const { Token } = req.cookies;

    if(!Token){
        return ( new ApiErrorHandler("Please Login To Access", 401));
    };

    const decode = await JWT.verify(Token, process.env.YOUTUBE_SECRECT_KEY);
    req.user = await UserModel.findById(decode.id);
};


export { AccessToken, VerifyToken }