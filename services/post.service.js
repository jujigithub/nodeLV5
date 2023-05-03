const PostRepository = require("../repositories/post.repository");
const { Posts } = require("../models");

class PostService {
  postRepository = new PostRepository(Posts);

  createPost = async (userId, nickname, title, content) => {
    await this.postRepository.createPost(userId, nickname, title, content);

    return { message: "게시글 작성에 성공하였습니다." };
  };

  findAllPosts = async () => {
    const allPosts = await this.postRepository.findAllPosts();

    return allPosts.map((a) => {
      return {
        postId: a.postId,
        userId: a.UserId,
        nickname: a.nickname,
        title: a.title,
        likes: a.likes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
  };

  findOnePost = async (postId) => {
    const post = await this.postRepository.findOnePost(postId);
    if (post) {
      return {
        postId: post.postId,
        userId: post.UserId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    }
  };

  putPost = async (title, content, postId, userId) => {
    await this.postRepository.putPost(title, content, postId, userId);
    return { message: "게시글을 수정하였습니다." };
  };

  deletePost = async (postId, userId) => {
    await this.postRepository.deletePost(postId, userId);
    return { message: "게시글을 삭제하였습니다." };
  };

  findLikePosts = async (likes) => {
    const findLikePostsData = await this.postRepository.findLikePosts(likes);

    const posts = findLikePostsData.map((a) => ({
      postId: a.postId,
      userId: a.UserId,
      nickname: a.nickname,
      title: a.title,
      likes: a.likes,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
    return posts;
  };

  likeUp = async (postId, userId) => {
    const postLikeUp = await this.postRepository.likeUp(postId, userId);
    return postLikeUp;
  };

  likeDown = async (postId, userId) => {
    const postLikeDown = await this.postRepository.likeDown(postId, userId);
    return postLikeDown;
  };
}

module.exports = PostService;
