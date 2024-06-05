import asyncHandler from "../utils/asyncHandler";
import ResponseHandler from "../utils/responseHandler";



// --------------- HealthCheck Handlers --------------- START

const HealthCheckYouTube = asyncHandler(async (req, res) => {
    return res.status(200)
    .send("<h1 style='color : red, font-size : 80px'>WELCOME ON YOUTUBE APP<h1>")
    .send("<h1 style='font-size : 40px'> Server is Running<h1/>")
});


const YouTubeAppInfo = asyncHandler(async (req, res) => {

    const AboutMe = {
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBS1uhGKUFyBAzgZlK1MFG54vapUWIKNmslbUt_EHGUtp2Xw-Xu1rnwe2FYKZzfQZJncQ&usqp=CAU",
        application : "YouTube",
        version : "V/.YT.1.0.0",
        released : "2024",
        developer : "Manish Dhiman Leo",
        origin : "India",
        features : "Apply Monetization for make money, Live Video Striming, Brand Collaboration"
    }
   
    return res
    .status(200)
    .json(new ResponseHandler(201, AboutMe, "About Me"))
});

// --------------- HealthCheck Handlers --------------- END


// Export HealthCheck Handler
export{
    HealthCheckYouTube,
    YouTubeAppInfo
};
