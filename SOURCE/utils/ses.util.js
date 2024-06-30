import nodemailer from 'nodemailer';


// SendEmail is a Function for Send Email
const SendEmail = async(options) => {

    const Transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "manishkumarajiva@gmail.com",
            pass: "sjlapcqsykgtfvgu"
        }
    });
    
    
    Transporter.sendMail(options, (error, info) => {
        if (error) throw error;
        return true;
    });
};

export default SendEmail;
