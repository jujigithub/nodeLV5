const CommentService = require("../services/comment.service");
const PostService = require("../services/post.service");

class CommentController {
  commentService = new CommentService();
  postService = new PostService();

  createComment = async (req, res) => {
    const { nickname, userId } = res.locals.user;
    const { comment } = req.body;
    const { postId } = req.params;
    const existPost = await this.postService.findOnePost(postId);

    const createComment = await this.commentService.createComment(
      postId,
      userId,
      nickname,
      comment
    );
    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }

      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }
      if (!comment) {
        res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
        return;
      }
      res.status(201).json(createComment);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "댓글 작성에 실패하였습니다.",
      });
    }
  };

  getComments = async (req, res) => {
    const { postId } = req.params;
    const existPost = await this.postService.findOnePost(postId);
    const comments = await this.commentService.getComments(postId);

    try {
      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }
      res.status(200).json({ comments: comments });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "댓글 조회에 실패하였습니다.",
      });
    }
  };

  putComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    const existPost = await this.postService.findOnePost(postId);
    const existCom = await this.commentService.findOneComment(commentId);
    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }
      if (existCom.userId !== userId) {
        res
          .status(403)
          .json({ message: "댓글의 수정 권한이 존재하지 않습니다." });
        return;
      }

      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }

      if (!existCom) {
        res.status(404).json({ message: "댓글이 존재하지 않습니다" });
        return;
      }
      if (!comment) {
        res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
        return;
      }
      const putComment = await this.commentService
        .putComment(comment, commentId, postId, userId)
        .catch((err) => {
          res.status(401).json({
            errorMessage: "댓글 수정이 정상적으로 처리되지 않았습니다.",
          });
        });
      res.status(200).json(putComment);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "댓글 수정에 실패하였습니다.",
      });
    }
  };

  deleteComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const { userId } = res.locals.user;
    const post = await this.postService.findOnePost(postId);
    const com = await this.commentService.findOneComment(commentId);
    try {
      if (!post) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다." });
        return;
      }
      if (!com) {
        res.status(404).json({ message: "댓글이 존재하지 않습니다." });
        return;
      }
      if (com.userId !== userId) {
        res
          .status(403)
          .json({ message: "댓글의 삭제 권한이 존재하지 않습니다." });
        return;
      }
      const deleteComment = await this.commentService
        .deleteComment(commentId, postId, userId)
        .catch((err) => {
          res.status(400).json({
            errorMessage: "댓글 삭제가 정상적으로 처리되지 않았습니다.",
          });
        });
      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 삭제에 실패하였습니다.",
      });
    }
  };
}

module.exports = CommentController;
