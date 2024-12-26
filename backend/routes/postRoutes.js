import {Router} from "express"
import { createPost, deleteAll, deletePost, getAllPosts, getPostById } from "../controllers/postController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(checkAuth);

router.post("/create",createPost)
router.get("/all-posts",getAllPosts)
router.get("/get-post/:id",getPostById)
router.delete("/delete/:id",deletePost)
router.delete("/delete-all",deleteAll)


export default router;