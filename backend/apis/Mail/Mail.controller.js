
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
let userEmail;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // e.g., smtp.gmail.com, smtp.mailtrap.io
    port: 587, // Change this to your mail server's port
    secure: false, // Set to true for port 465 (SSL), false for 587 (TLS)
    auth: {
        user: "savangondaliya0@gmail.com",
        pass: "gcaz huet anfa jgwp",
    },
});

export const RegistrationMail = async(req, res) => {
    try {   
        
        const {name,email,dob,password,gender} = JSON.parse(req.query.userDetails);   
        const verifyDetails = CryptoJS.AES.encrypt(JSON.stringify({"name":name,"email":email,"password":password}),"session").toString();
        
        const mailOptions = {
            from: "savangondaliya0@gmail.com",
            to: `${email}`,
            subject: "Welcome!",
            html: `
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                    </head>
                    <body>
                        <div class="container ">
                            <h2>Welcome! ${name}</h2>
                            <p>This is an HTML email with Bootstrap styling and an attached image.</p>
                            <img src="cid:unique-image-id" alt="Email Image" width="200 ">
                            <br><br>
                            <a href="http://localhost:5173/verification?verifyDetails=${verifyDetails}" target="_self" class="btn btn-success text-center">Verify</a>
                        </div>
                    </body>
                </html> `
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(400).json({success: false}) 
            } else {
                userEmail = `${email}`
                console.log(userEmail);
                console.log("Email sent:", info.response);
                return res.status(200).json({success:true});
            }
        });        

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}

export const verifyEmail = async(req, res) => {
    try {
        const email = req.query.verifyEmail;
        
        if (email){
            return res.status(200).json({success:true})
        }
        return res.status(400).json({success:false});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}