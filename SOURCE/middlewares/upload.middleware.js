const DIRECTORY = process.env.DIRECTORY_PATH;
import ErrorHandler from "../utils/errorHandler.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "avatar") {
            cb(null, path.join(__dirname, DIRECTORY, "PUBLIC/upload/avatar"));
        } else if (file.fieldname === "banner") {
            cb(null, path.join(__dirname, DIRECTORY, "PUBLIC/upload/banner"));
        } else if (file.fieldname === "video") {
            cb(null, path.join(__dirname, DIRECTORY, "PUBLIC/upload/video"));
        } else {
            cb(null, path.join(__dirname, DIRECTORY, "PUBLIC/upload/thumbnail"));
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9) + "-";
        cb(null, uniqueSuffix + `${file.originalname}`);
    },
})

const upload = multer({ storage: Storage });



export default upload;



// const upload = multer({ dest: 'uploads/' });


