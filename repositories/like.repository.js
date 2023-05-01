const { Posts } = require("../models");
const { Likes } = require("../models");

class LikeRepository {
  findAllLikes = async (userId) => {
    const likes = await Likes.findAll({
      where: { UserId: userId },
      attributes: ["PostId"],
    });
    return likes;
  };

  findOneLike = async (postId, userId) => {
    const like = await Likes.findOne({
      where: {
        PostId: postId,
        UserId: userId,
      },
    });
    return like;
  };

  createLike = async (postId, userId) => {
    const createLike = await Likes.create({
      PostId: postId,
      UserId: userId,
    });
    return createLike;
  };

  deleteLike = async (postId, userId) => {
    const deleteLike = await Likes.destroy({
      where: {
        PostId: postId,
        UserId: userId,
      },
    });
    return deleteLike;
  };
}

module.exports = LikeRepository;
