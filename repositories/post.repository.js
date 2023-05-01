const { Posts } = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

class PostRepository {
  createPost = async (userId, nickname, title, content) => {
    const createPost = await Posts.create({
      UserId: userId,
      nickname,
      title,
      content,
    });
    return createPost;
  };

  findAllPosts = async () => {
    const posts = await Posts.findAll({
      attributes: [
        "postId",
        "UserId",
        "nickname",
        "title",
        "likes",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return posts;
  };

  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId: postId },
      attributes: [
        "postId",
        "UserId",
        "nickname",
        "title",
        "content",
        "likes",
        "createdAt",
        "updatedAt",
      ],
    });
    return post;
  };

  putPost = async (title, content, postId, userId) => {
    const putPost = await Posts.update(
      { title, content },
      {
        where: {
          postId: postId,
          UserId: userId,
        },
      }
    );
    return putPost;
  };

  deletePost = async (postId, userId) => {
    const deletePost = await Posts.destroy({
      where: {
        postId: postId,
        UserId: userId,
      },
    });
    return deletePost;
  };

  findLikePosts = async (likes) => {
    const posts = likes.map((a) => a.postId);
    const likePosts = await Posts.findAll({
      where: {
        postId: { [Op.in]: posts },
      },
      attributes: [
        "postId",
        "UserId",
        "nickname",
        "title",
        "likes",
        "createdAt",
        "updatedAt",
      ],
      order: [["likes", "DESC"]],
    });

    return likePosts;
  };

  likeUp = async (postId, userId) => {
    const postLikeUp = await Posts.update(
      { likes: Sequelize.literal("likes + 1") },
      { where: { postId: postId } }
    );
    return postLikeUp;
  };

  likeDown = async (postId, userId) => {
    const postLikeDown = await Posts.update(
      { likes: Sequelize.literal("likes - 1") },
      { where: { postId: postId } }
    );

    return postLikeDown;
  };
}

module.exports = PostRepository;
