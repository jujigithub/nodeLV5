const CommentRepository = require("../repositories/comment.repository");
const { Posts } = require("../models");
const { Comments } = require("../models");

class CommentService {
  commentRepository = new CommentRepository(Comments);

  createComment = async (postId, userId, nickname, comment) => {
    await this.commentRepository.createComment(
      postId,
      userId,
      nickname,
      comment
    );
    return { message: "댓글 작성에 성공하였습니다." };
  };

  getComments = async (postId) => {
    const comments = await this.commentRepository.getComments(postId);
    return comments.map((a) => {
      return {
        commentId: a.commentId,
        userId: a.UserId,
        nickname: a.nickname,
        comment: a.comment,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
  };

  putComment = async (comment, commentId, postId, userId) => {
    await this.commentRepository.putComment(comment, commentId, postId, userId);
    return { message: "댓글을 수정하였습니다." };
  };

  deleteComment = async (commentId, postId, userId) => {
    await this.commentRepository.deleteComment(commentId, postId, userId);
    return { message: "게시글을 삭제하였습니다." };
  };

  findOneComment = async (commentId) => {
    const comment = await this.commentRepository.findOneComment(commentId);
    if (comment) {
      return {
        commentId: comment.commentId,
        postId: comment.PostId,
        userId: comment.UserId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    }
  };
}

module.exports = CommentService;
