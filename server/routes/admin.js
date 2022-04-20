import express from "express";
import { loginUser, signupUser, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/adminController.js";

 
const router = express.Router();

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);


export default router;