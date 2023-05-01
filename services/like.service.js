const LikeRepository = require("../repositories/like.repository");
const { Likes } = require("../models");

class LikeService {
  likeRepository = new LikeRepository(Likes);

  findAllLikes = async (userId) => {
    const likes = await this.likeRepository.findAllLikes(userId);
    return likes.map((a) => {
      return {
        postId: a.PostId,
        userId: a.UserId,
        nickname: a.nickname,
        title: a.title,
        likes: a.likes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
  };

  findOneLike = async (postId, userId) => {
    const like = await this.likeRepository.findOneLike(postId, userId);
    return like;
  };

  createLike = async (postId, userId) => {
    await this.likeRepository.createLike(postId, userId);
    return { message: "게시글의 좋아요를 등록하였습니다." };
  };

  deleteLike = async (postId, userId) => {
    await this.likeRepository.deleteLike(postId, userId);
    return { message: "게시글의 좋아요를 취소하였습니다." };
  };
}
module.exports = LikeService;
