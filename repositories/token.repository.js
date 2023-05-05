const { Tokens } = require("../models");

class TokenRepository {
  setRefreshToken = async (refreshToken, userId) => {
    const existToken = await Tokens.findOne({
      where: { userId: userId },
      attributes: ["UserId"],
    });

    if (!existToken) {
      const rToken = await Tokens.create({
        UserId: userId,
        refreshToken: refreshToken,
      });
      return rToken;
    }
  };

  getRefreshToken = async (userId) => {
    const token = await Tokens.findOne({
      where: { userId: userId },
      attributes: ["UserId"],
    });
    return token;
  };
}

module.exports = TokenRepository;
