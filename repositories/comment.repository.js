const { Comments } = require("../models");

class CommentRepository {
  createComment = async (postId, userId, nickname, comment) => {
    const createComment = await Comments.create({
      PostId: postId,
      UserId: userId,
      nickname,
      comment,
    });
    return createComment;
  };

  getComments = async (postId) => {
    const comments = await Comments.findAll({
      where: {
        PostId: postId,
      },
      attributes: [
        "commentId",
        "UserId",
        "nickname",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return comments;
  };

  putComment = async (comment, commentId, postId, userId) => {
    const putComment = await Comments.update(
      { comment },
      {
        where: {
          commentId: commentId,
          PostId: postId,
          UserId: userId,
        },
      }
    );
    return putComment;
  };

  deleteComment = async (commentId, postId, userId) => {
    const deleteComment = await Comments.destroy({
      where: {
        commentId: commentId,
        postId: postId,
        UserId: userId,
      },
    });
    return deleteComment;
  };

  findOneComment = async (commentId) => {
    const comment = await Comments.findOne({
      where: { commentId: commentId },
      attributes: ["commentId", "PostId", "UserId", "createdAt", "updatedAt"],
    });
    return comment;
  };
}

module.exports = CommentRepository;
