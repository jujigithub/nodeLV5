const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();

router.get("/posts/like/read", authMiddleware, likeController.getLikes);

module.exports = router;
