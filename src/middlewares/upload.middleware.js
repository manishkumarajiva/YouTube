import ErrorHandler  from "../utils/errorHandler.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Use for YouTube App -- LOCAL STORAGE
    const Storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.fieldname === "avatar"){
                cb(null, path.join(__dirname, "..", "public/upload/avatar"));
            }else if(file.fieldname === "banner"){
                cb(null, path.join(__dirname, "..", "public/upload/banner"));
            }else if(file.fieldname === "video"){
                cb(null, path.join(__dirname, "..", "public/upload/video"));
            }else{
                cb(null, path.join(__dirname, "..", "public/upload/thumbnail"));
            }
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9) + "-";
            cb(null, uniqueSuffix + `${file.originalname}`);
        },
    });

    const upload = multer({ storage: Storage });



export default upload;



