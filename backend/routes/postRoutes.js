import {Router} from "express"
import { createPost, getPosts } from "../controllers/postController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create",checkAuth,createPost)
router.get("/all-posts",checkAuth,getPosts)


export default router;