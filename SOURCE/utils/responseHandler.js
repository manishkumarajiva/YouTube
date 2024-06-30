class ResponseHandler {
    constructor(statusCode, data, message = "Success", token){
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
        this.data = data;
        this.token = token;
    }
};


export default ResponseHandler;