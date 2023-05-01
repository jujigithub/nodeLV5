const CommentService = require("../services/comment.service");
const PostService = require("../services/post.service");

class CommentController {
  commentService = new CommentService();
  postService = new PostService();

  //댓글 아직 안만듦
  createComment = async (req, res) => {
    // const { nickname, userId } = res.locals.user;
    // const { comment } = req.body;
    // const { postId } = req.params;
    // try {
    //   if (Object.keys(req.body).length === 0) {
    //     res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
    //     return;
    //   }
    //   const existPost = await Posts.findByPk(postId);
    //   if (!existPost) {
    //     res.status(404).json({ message: "게시글이 존재하지 않습니다" });
    //     return;
    //   }
    //   if (!comment) {
    //     res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
    //     return;
    //   }
    //   await Comments.create({
    //     PostId: postId,
    //     UserId: userId,
    //     nickname,
    //     comment,
    //   });
    //   res.status(201).json({ message: "댓글을 작성하였습니다." });
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json({
    //     errorMessage: "댓글 작성에 실패하였습니다.",
    //   });
    // }
  };

  getComments = async (req, res) => {
    // const { postId } = req.params;
    // const comments = await Comments.findAll({
    //   where: {
    //     PostId: postId,
    //   },
    //   attributes: [
    //     "commentId",
    //     "userId",
    //     "nickname",
    //     "comment",
    //     "createdAt",
    //     "updatedAt",
    //   ],
    // });
    // try {
    //   const existPost = await Posts.findByPk(postId);
    //   if (!existPost) {
    //     res.status(404).json({ message: "게시글이 존재하지 않습니다" });
    //     return;
    //   }
    //   res.status(200).json({ comments });
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json({
    //     errorMessage: "댓글 조회에 실패하였습니다.",
    //   });
    // }
  };

  putComment = async (req, res) => {
    // const { commentId, postId } = req.params;
    // const { userId } = res.locals.user;
    // const { comment } = req.body;
    // const com = await Comments.findOne({ where: { commentId: commentId } });
    // try {
    //   if (Object.keys(req.body).length === 0) {
    //     res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
    //     return;
    //   }
    //   if (com.UserId !== userId) {
    //     res
    //       .status(403)
    //       .json({ message: "댓글의 수정 권한이 존재하지 않습니다." });
    //     return;
    //   }
    //   const existPost = await Posts.findByPk(postId);
    //   if (!existPost) {
    //     res.status(404).json({ message: "게시글이 존재하지 않습니다" });
    //     return;
    //   }
    //   const existCom = await Comments.findByPk(commentId);
    //   if (!existCom) {
    //     res.status(404).json({ message: "댓글이 존재하지 않습니다" });
    //     return;
    //   }
    //   if (!comment) {
    //     res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
    //     return;
    //   }
    //   await Comments.update(
    //     { comment, updatedAt: Date.now() },
    //     { where: { commentId: commentId } }
    //   ).catch((err) => {
    //     res.status(400).json({
    //       errorMessage: "댓글 수정이 정상적으로 처리되지 않았습니다.",
    //     });
    //   });
    //   res.status(200).json({ message: "댓글을 수정하였습니다." });
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json({
    //     errorMessage: "댓글 수정에 실패하였습니다.",
    //   });
    // }
  };

  deleteComment = async (req, res) => {
    //   const { commentId, postId } = req.params;
    //   const { userId } = res.locals.user;
    //   const post = await Posts.findOne({ where: { postId: postId } });
    //   const com = await Comments.findOne({ where: { commentId: commentId } });
    //   try {
    //     if (!post) {
    //       res.status(404).json({ message: "게시글이 존재하지 않습니다." });
    //       return;
    //     }
    //     if (!com) {
    //       res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    //       return;
    //     }
    //     if (com.UserId !== userId) {
    //       res
    //         .status(403)
    //         .json({ message: "댓글의 삭제 권한이 존재하지 않습니다." });
    //       return;
    //     }
    //     await Comments.destroy({ where: { commentId: commentId } }).catch(
    //       (err) => {
    //         res.status(400).json({
    //           errorMessage: "댓글 삭제가 정상적으로 처리되지 않았습니다.",
    //         });
    //       }
    //     );
    //     res.status(200).json({ message: "댓글을 삭제하였습니다." });
    //   } catch (err) {
    //     console.log(err);
    //     res.status(400).json({
    //       errorMessage: "댓글 삭제에 실패하였습니다.",
    //     });
    //   }
  };
}

module.exports = CommentController;
