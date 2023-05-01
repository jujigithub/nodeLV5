const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostController = require("../controllers/post.controller");
const postController = new PostController();

router.post("/posts", authMiddleware, postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:postId", postController.getPost);
router.put("/posts/:postId", authMiddleware, postController.putPost);
router.delete("/posts/:postId", authMiddleware, postController.deletePost);
router.put("/posts/:postId/like", authMiddleware, postController.putLike);

module.exports = router;
