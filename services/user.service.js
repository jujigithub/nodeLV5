const UserRepository = require("../repositories/user.repository");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository(Users);

  signup = async (nickname, password) => {
    await this.userRepository.createUser(nickname, password);
    return { message: "회원 가입에 성공하였습니다." };
  };

  login = async (nickname, password) => {
    const user = await this.userRepository.findOneUser(nickname);
    const token = jwt.sign({ userId: user.userId }, "jjm-custom-secret-key");
    return { token };
  };

  findOneUser = async (nickname) => {
    const findOneUserData = this.userRepository.findOneUser(nickname);

    return findOneUserData;
  };
}

module.exports = UserService;
