import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";



const CreateUser = async (profile) => {

    const payload = {
        googleId : profile.id,
        fullname : "Manish Dhiman"
    }
  
    const createUser = await UserModel.create(payload);

    if(createUser){
        return createUser;
    }
};

export default CreateUser;