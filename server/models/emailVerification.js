import moment from 'moment-timezone';
import mongoose from "mongoose";

const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

const emailSchema =  mongoose.Schema({    
    email: { type: String, required: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, required: true },
    expireAt: { type: Date, default: dateIndia },
})

emailSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 360 } );

const EmailVerification =  mongoose.model("EmailVerification", emailSchema);

EmailVerification.syncIndexes();    //Check if the collection has correct indexes. Mongoose do not update indexes if the collection already have it. If expiration time was 0 when you first created the index the documents will be removed within a minute whatever changes you do in your js code until you drop the index, collection, or the whole database.
                                    //Use syncIndexes to update indexes on the database side, but be careful to ensure it doesn't happen often on production. It may be quite expensive on large collections.
export default EmailVerification;


