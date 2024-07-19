import cloudinary from "../config/cloudnary.config.js";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler.js";


const CloudinaryUpload = async (mediafile) => {

    try {
        const options = {
            resourse_type : mediafile.type,
            filder_name : mediafile.folder
        }

        const path = mediafile.path;
    
        const uploadResponse = await cloudinary.uploader.upload(path, options);
        console.log(uploadResponse)
        
        // if(uploadResponse){
        //     fs.unlinkSync(path);
        //     return uploadResponse;
        // }

    } catch (error) {
        // fs.unlinkSync(path)
        // res.status(500).json(new ErrorHandler(500, "🔴 Cloudinary Error"));
    }
};

export default CloudinaryUpload;