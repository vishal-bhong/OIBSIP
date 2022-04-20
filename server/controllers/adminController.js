import Admin from '../models/admin.js';
import emailVerification from '../models/emailVerification.js'
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your email', // gmail user user
      pass: 'your password', // generated App password through gmail link  -   https://myaccount.google.com/apppasswords?rapt=AEjHL4OTlbISuIaeOrSTqg7enUEy4vr2-rErOgD-UaQPD8DR2xuok57gY42A_IboAXeAX-9s1NRg6F0e7_xsYWIp0cDhnMFJqw
    },
  });


export const generateOtpForEmail = async (req, res) => {
    const { emailForVerification } = req.body;

    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    const existingEmailForVerification = await emailVerification.findOne({ email: emailForVerification });

    if(existingEmailForVerification) {
        await emailVerification.findByIdAndRemove(existingEmailForVerification._id);       
    }

    let mailMessage = {
        to: `${emailForVerification}`,
       subject: "Otp for email Verification is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
     };

    transporter.sendMail(mailMessage, (error) => {
        if (error) {
            res.status(500).json({ message: error })
        }
    })

    const result = await emailVerification.create({ email: emailForVerification, otp, verified: false })
    res.status(200).json({ result: result.email });       
}

export const verifyOtpForEmail = async (req, res) => {
    const { emailForVerification, OTP } = req.body;

    try {
        const existingUser = await emailVerification.findOne({ email: emailForVerification });
        
        if(!existingUser) return res.status(500).json({ message: "OTP expired !" });

        if(OTP !== existingUser.otp) return res.status(401).json({ message: "OTP doesn't match."});
        
        if(OTP == existingUser.otp) {
            await emailVerification.findByIdAndUpdate(existingUser._id, { email: emailForVerification, otp: existingUser.otp, verified: true }, { new: true });
            return res.status(200).json({ message: "Email Verified Successfully...", result: existingUser.email });
        }

    } catch (error) {
        res.status(500).json({ message: "something went wrong!"});
    }
}

export const signupUser = async (req, res) => {
    const { firstName, lastName, email, mobileNo, address, storeName, password, confirmPassword } = req.body;
    try {               
        const existingUser = await Admin.findOne({ email });
    
        if(existingUser) return res.status(400).json({ message: "user already exists!" });

        const existingEmailForVerification = await emailVerification.findOne({ email });

        if(!existingEmailForVerification) return res.status(400).json({ message: "please verify email !" });
        
        if(!existingEmailForVerification.verified) return res.status(400).json({ message: "please verify email !" });

        if(password !== confirmPassword) return res.status(400).json({ message: "password don't match."});
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await Admin.create({ email: existingEmailForVerification.email, mobileNo, address, storeName, password: hashedPassword, name: `${firstName} ${lastName}`}); 
       
        res.status(200).json({ message: 'user Signed In successfully...', result });
        
    } catch (error) {
        res.status(500).json({ message: 'something went wrong !' })
    }   
    
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Admin.findOne({ email });
        
        if(!existingUser) return res.status(404).json({ message: "user doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});

        res.status(200).json({ result: existingUser });

    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}

export const forgotPassword = async (req, res) => {
    const { emailForVerification, password, confirmPassword } = req.body;

    try {
        const existingUser = await Admin.findOne({ email: emailForVerification });
        
        if(!existingUser) return res.status(404).json({ message: `no user found with email ${emailForVerification}` });

        const existingEmailForVerification = await emailVerification.findOne({ email: emailForVerification });

        if(!existingEmailForVerification) return res.status(400).json({ message: "please verify with email !" });
        
        if(!existingEmailForVerification.verified) return res.status(400).json({ message: "please verify with email !" });

        if(password !== confirmPassword) return res.status(400).json({ message: "password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        // const updatedUser = { ...existingUser, password: hashedPassword };
        existingUser.password = hashedPassword;

        const updatedUser = await existingUser.save();
    
        //const result = await Admin.findByIdAndUpdate(existingUser._id, updatedUser, { new: true }); 
       
        res.status(200).json({ message: 'password changed successfully...', updatedUser });

    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}
