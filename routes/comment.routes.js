const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createComment
);
router.get("/posts/:postId/comments", commentController.getComments);
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.putComment
);
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
