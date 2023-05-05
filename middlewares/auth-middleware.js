const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { Tokens } = require("../models");
const UserRepository = require("../repositories/user.repository");
const TokenRepository = require("../repositories/token.repository");

const SECRET_KEY = "jjm-custom-secret-key";

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const userRepository = new UserRepository(Users);
  const tokenRepository = new TokenRepository(Tokens);
  const { Authorization, refreshToken } = req.cookies;
  const [authType, accessToken] = (Authorization ?? "").split(" ");

  if (!accessToken || authType !== "Bearer") {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  if (!refreshToken) {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  try {
    const accessToken = req.cookies.Authorization;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res
        .status(400)
        .json({ message: "Refresh Token이 존재하지 않습니다." });
    if (!accessToken)
      return res
        .status(400)
        .json({ message: "Access Token이 존재하지 않습니다." });

    const a = accessToken.split(" ")[1];
    const isAccessTokenValidate = validateAccessToken(a);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    const decodedToken = jwt.verify(a, SECRET_KEY);
    const userId = decodedToken.userId;

    if (!isRefreshTokenValidate)
      return res
        .status(419)
        .json({ message: "Refresh Token이 만료되었습니다." });

    if (!isAccessTokenValidate) {
      const user = await tokenRepository.getRefreshToken(userId);
      // const accessTokenId = tokenObject[refreshToken]; 이거를user로바꿔준거임
      if (!user) {
        return res.status(419).json({
          message: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
        });
      } else {
        const newAccessToken = createAccessToken(user);
        res.cookie("accessToken", newAccessToken);
        return res.json({ message: "Access Token을 새롭게 발급하였습니다." });
      }
    }

    // const { id } = getAccessTokenPayload(accessToken); //이거 써도됨
    const user = await Users.findOne({ where: { userId } });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie("Authorization");
    return res.status(403).send({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다",
    });
  }
};

// Access Token을 생성합니다.
function createAccessToken(user) {
  const accessToken = jwt.sign(
    { userId: user.userId }, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: "10s" }
  ); // Access Token이 10초 뒤에 만료되도록 설정합니다.

  return accessToken;
}

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}
