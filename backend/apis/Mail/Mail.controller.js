import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
let userEmail;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "savangondaliya0@gmail.com",
    pass: "gcaz huet anfa jgwp",
  },
});

export const RegistrationMail = async (req, res) => {
  try {
    const { name, email, dob, password, gender } = JSON.parse(
      req.query.userDetails
    );
    const verifyDetails = CryptoJS.AES.encrypt(
      JSON.stringify({ name: name, email: email, password: password }),
      "session"
    ).toString();

    const mailOptions = {
      from: "savangondaliya0@gmail.com",
      to: `${email}`,
      subject: "Welcome!",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap" rel="stylesheet">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
              <title>Welcome to MusicApp</title>

          </head>
          <body style="font-family: 'teko', sans-serif; margin: 0; padding: 0;">
              <div class="container" style="max-width: 600px; margin: 20px auto; background: #4949bf; padding: 20px; border-radius: 5px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
                  <div class="header" style="background: #f2c178; color: white; padding: 20px; font-size: 24px; font-weight: bold; border-radius: 5px;">Welcome to Noizee, ${name}!</div>
                  <div class="content" style="width: 100%; color: #333; text-align: center;">
                      <p>We're excited to have you on board. Get ready to explore your favorite tracks, create playlists, and enjoy a personalized music experience.</p>
                      <a href="http://localhost:5173/verification?verifyDetails=${verifyDetails}" class="btn" style="display: inline-block; padding: 12px 20px; margin-top: 15px; background: #f2c178; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">Verify Your Account</a>
                  </div>
                  <div id="lottie-container"></div>
                  <div class="footer" style="margin-top: 20px; font-size: 12px; color: #333; font-weight: bold;">&copy; 2025 Noizee. All rights reserved.</div>
              </div>
          </body>
          </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(400).json({ success: false });
      } else {
        userEmail = `${email}`;
        console.log(userEmail);
        console.log("Email sent:", info.response);
        return res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const email = req.query.verifyEmail;

    if (email) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};



export const optEmail = async(req,res) => {
  try {
  
  
  const {receiver} = req.query;
  const {otp} = req.query;
  
  const mailOptions = {
        from: "savangondaliya0@gmail.com",
        to: `${receiver}`,
        subject: "Welcome!",
        html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap" rel="stylesheet">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
              <title>Welcome to MusicApp</title>

            </head>
            <body style="font-family: 'teko', sans-serif; margin: 0; padding: 0;">
                Your Authentication OTP is ${otp}
            </body>
           </html>`};
            
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(400).json({ success: false });
            } else {
            return res.status(200).json({ success: true });
          }
  });
  } catch (error) {
    return res.status(500).send()
  }
}