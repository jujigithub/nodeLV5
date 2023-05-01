const PostService = require("../services/post.service");
const LikeService = require("../services/like.service");

class LikeController {
  postService = new PostService();
  likeService = new LikeService();

  getLikes = async (req, res) => {
    const { userId } = res.locals.user;
    const likes = await this.likeService.findAllLikes(userId);
    const likePost = await this.postService.findLikePosts(likes);

    try {
      res.status(200).json(likePost);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "좋아요 게시글 조회에 실패하였습니다.",
      });
    }
  };
}

module.exports = LikeController;
