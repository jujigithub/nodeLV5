const UserRepository = require("../repositories/user.repository");
const { Users } = require("../models");
const { Tokens } = require("../models");
const jwt = require("jsonwebtoken");
const TokenRepository = require("../repositories/token.repository");

class UserService {
  userRepository = new UserRepository(Users);
  tokenRepository = new TokenRepository(Tokens);

  signup = async (nickname, password) => {
    await this.userRepository.createUser(nickname, password);
    return { message: "회원 가입에 성공하였습니다." };
  };

  login = async (nickname) => {
    const user = await this.userRepository.findOneUser(nickname);
    const userId = user.userId;
    const accessToken = jwt.sign(
      { userId: user.userId },
      "jjm-custom-secret-key",
      {
        expiresIn: "2h",
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshToken = jwt.sign({}, "jjm-custom-secret-key", {
      expiresIn: "7d",
    });
    await this.tokenRepository.setRefreshToken(refreshToken, userId);

    return { accessObject, refreshToken: refreshToken };
  };

  findOneUser = async (nickname) => {
    const findOneUserData = this.userRepository.findOneUser(nickname);

    return findOneUserData;
  };
}

module.exports = UserService;
