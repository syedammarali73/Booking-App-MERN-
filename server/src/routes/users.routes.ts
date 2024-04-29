import express from "express";
const router = express.Router();
import registerUser from '../controllers/user.controller';
import { check, validationResult } from "express-validator";

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min: 6}),

], 
    registerUser)

export default router;