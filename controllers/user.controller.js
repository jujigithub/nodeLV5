const UserService = require("../services/user.service");
const PostService = require("../services/post.service");
const jwt = require("jsonwebtoken");

class UserController {
  userService = new UserService();
  postService = new PostService();

  signup = async (req, res) => {
    const { nickname, password, confirm } = req.body;
    try {
      if (password !== confirm) {
        res.status(412).json({
          errorMessage: "패스워드가 일치하지 않습니다.",
        });
        return;
      }

      // nickname 중복
      const existsUsers = await this.userService.findOneUser(nickname);
      if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
        res.status(412).json({
          errorMessage: "중복된 닉네임입니다.",
        });
        return;
      }

      //닉네임 조건
      const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
      if (!nicknameFilter) {
        res.status(412).json({
          errorMessage: "닉네임의 형식이 일치하지 않습니다.",
        });
        return;
      }

      //패스워드 길이조건
      if (password.length < 4) {
        res.status(412).json({
          errorMessage: "패스워드 형식이 일치하지 않습니다.",
        });
        return;
      }

      //패스워드 형식조건
      if (password.includes(nickname)) {
        res.status(412).json({
          errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
        });
        return;
      }
      const signupData = await this.userService.signup(nickname, password);

      res.status(201).json(signupData);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
      });
    }
  };

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const user = await this.userService.findOneUser(nickname);
    try {
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
        });
        return;
      }

      const userData = await this.userService.login(nickname, password);

      res.cookie("Authorization", `Bearer ${userData.token}`);
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };
}

module.exports = UserController;
