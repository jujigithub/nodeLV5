const express = require("express");
const app = express();
const port = 3018;
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes.js");
const commentRouter = require("./routes/comment.routes.js");
const likeRouter = require("./routes/like.routes.js");
const indexRouter = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", [
  indexRouter,
  postRouter,
  userRouter,
  commentRouter,
  likeRouter,
]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
