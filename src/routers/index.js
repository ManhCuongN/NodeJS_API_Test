const apiRouter = require("./apis/apiAuthRoutes");
const homeRouter = require("./web/home");
const authRouter = require("./web/auth");
const apiTodolistRouter = require("./apis/apiTodolistRoutes");

function router(app) {
  app.use("/", homeRouter);
  app.use("/web/auth", authRouter);
  app.use("/api/v1/auth", apiRouter);
  app.use("/api/v1/todolist", apiTodolistRouter);
}
module.exports = router;
