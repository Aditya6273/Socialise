import express from 'express';
import { Login, Logout, Profile, Register } from '../controllers/authController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/register",Register)
router.post("/login",Login)
router.get("/logout",Logout)
router.get("/profile",checkAuth,Profile)



export default router;