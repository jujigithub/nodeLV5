const { Users } = require("../models");

class UserRepository {
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({
      nickname,
      password,
    });
    return createUserData;
  };

  findOneUser = async (nickname) => {
    const findOneUserData = await Users.findOne({
      where: { nickname: nickname },
    });
    return findOneUserData;
  };
}

module.exports = UserRepository;
