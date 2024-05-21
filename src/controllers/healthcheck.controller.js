import asyncHandler from "../utils/asyncHandler";



// --------------- HealthCheck Handlers --------------- START

const HealthCheckYouTube = asyncHandler(async (req, res) => {
    return res.status(200)
    .send("<h1>WELCOME TO YOUTUBE APP<h1>")
    .send("<h1 style='color : red'> Server Running....<h1/>")
});

// --------------- HealthCheck Handlers --------------- END


// Export HealthCheck Handler
export{
    HealthCheckYouTube
};
