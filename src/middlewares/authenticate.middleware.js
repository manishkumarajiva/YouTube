import JWT from 'jsonwebtoken';
import UserModel from "../models/user.model.js";



// Access Token
const AccessToken = async (user) => {
    
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

    return Promise(async (resolve, reject) => {
        const token = await JWT.sign(payload, secrectKey, optons);
        if(token){
            resolve(token);
        }else{
            reject("Error JWT")
        }
    })
};