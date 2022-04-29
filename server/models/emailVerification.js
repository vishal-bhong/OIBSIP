import moment from 'moment-timezone';
import mongoose from "mongoose";

const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

const emailSchema =  mongoose.Schema({    
    email: { type: String, required: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, required: true },
    expireAt: { type: Date, default: dateIndia },
})

emailSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 720 } );

const EmailVerification =  mongoose.model("EmailVerification", emailSchema);

EmailVerification.syncIndexes();   

export default EmailVerification;


