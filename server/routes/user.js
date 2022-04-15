import express from "express";
import { loginUser, signupUser, generateOtpForEmail, verifyOtpForEmail } from "../controllers/userController.js";

const router = express.Router();

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;