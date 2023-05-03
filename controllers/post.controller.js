const PostService = require("../services/post.service");
const LikeService = require("../services/like.service");

class PostController {
  postService = new PostService();
  likeService = new LikeService();

  createPost = async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { title, content } = req.body;
    const createPost = await this.postService.createPost(
      userId,
      nickname,
      title,
      content
    );

    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }

      if (title.length === 0) {
        res
          .status(412)
          .json({ message: "게시글 제목의 형식이 일치하지 않습니다." });
        return;
      }

      if (content.length === 0) {
        res
          .status(412)
          .json({ message: "게시글 내용의 형식이 일치하지 않습니다." });
        return;
      }

      res.status(201).json(createPost);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "게시글 작성에 실패하였습니다.",
      });
    }
  };

  getPosts = async (req, res) => {
    try {
      const posts = await this.postService.findAllPosts();

      res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "게시글 조회에 실패하였습니다.",
      });
    }
  };

  getPost = async (req, res) => {
    const { postId } = req.params;

    const post = await this.postService.findOnePost(postId);

    try {
      if (!post) {
        res.status(413).json({ message: "해당 게시글이 존재하지 않습니다." });
        return;
      }
      res.status(200).json({ post });
    } catch (err) {
      res.status(400).json({
        errorMessage: "게시글 조회에 실패하였습니다.",
      });
    }
  };

  putPost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    const post = await this.postService.findOnePost(postId);

    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }

      if (title.length === 0) {
        res
          .status(412)
          .json({ message: "게시글 제목의 형식이 일치하지 않습니다." });
        return;
      }

      if (content.length === 0) {
        res
          .status(412)
          .json({ message: "게시글 내용의 형식이 일치하지 않습니다." });
        return;
      }

      if (post.userId !== userId) {
        res
          .status(403)
          .json({ message: "게시글의 수정 권한이 존재하지 않습니다." });
        return;
      }

      const putPost = await this.postService
        .putPost(title, content, postId, userId)
        .catch((err) => {
          console.log(err);
          res.status(401).json({
            errorMessage: "게시글 수정이 정상적으로 처리되지 않았습니다.",
          });
        });
      res.status(200).json(putPost);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "게시글 수정에 실패하였습니다.",
      });
    }
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const post = await this.postService.findOnePost(postId);

    try {
      if (!post) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다." });
        return;
      }

      if (post.userId !== userId) {
        res
          .status(403)
          .json({ message: "게시글의 삭제 권한이 존재하지 않습니다." });
        return;
      }

      const deletePost = await this.postService
        .deletePost(postId, userId)
        .catch((err) => {
          res
            .status(401)
            .json({ errorMessage: "게시글이 정상적으로 삭제되지 않았습니다." });
        });

      res.status(200).json(deletePost);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "게시글 삭제에 실패하였습니다.",
      });
    }
  };

  putLike = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const existPost = await this.postService.findOnePost(postId);
    const existLike = await this.likeService.findOneLike(postId, userId);

    try {
      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다." });
        return;
      }

      if (existLike) {
        await this.likeService.deleteLike(postId, userId);
        await this.postService.likeDown(postId, userId);
        res.status(200).json({ message: "게시글의 좋아요를 취소하였습니다." });
      } else {
        await this.likeService.createLike(postId, userId);
        await this.postService.likeUp(postId, userId);
        res.status(200).json({ message: "게시글을 좋아요를 등록하였습니다." });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "게시글 좋아요에 실패하였습니다.",
      });
    }
  };
}

module.exports = PostController;
