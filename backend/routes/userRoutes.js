import { Router } from "express";
import { getBondings, getBonds, getUser, getUserPosts, makeBond } from "../controllers/user.Controller.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(checkAuth);

router.get('/posts',getUserPosts)
router.post("/make-bond/:id", makeBond);
router.get("/get-bondings",getBondings)
router.get("/get-bonds",getBonds)
router.get("/get-user/:id",getUser)

export default router;
