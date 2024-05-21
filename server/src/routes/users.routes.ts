import express, {Request, Response} from "express";
const router = express.Router();
import registerUser from '../controllers/user.controller';
import { check } from "express-validator";
import verifyToken from "../middleware/auth";
import User from "../models/user.model";

router.get("/me", verifyToken, async (req: Request, res: Response) =>{
    const userId = req.userId;
    console.log(`userId: ${userId}`);
    
    
    try {
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({ message: "User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong"})
    }
})

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min: 6}),

], 
    registerUser)

export default router;