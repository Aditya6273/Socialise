import { Router } from "express";
import { deleteComment, getCommentsOfPosts, postComment } from "../controllers/commentController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = new Router();
router.use(checkAuth);
router.post("/add-comment/:id", postComment);
router.get("/get-comments/:id",getCommentsOfPosts)
router.delete("/delete-comment/:id",deleteComment)

export default router;
