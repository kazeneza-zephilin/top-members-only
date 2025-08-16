const { Router } = require("express");
const userRouter = Router();
const {
    signupPage,
    handleSignup,
    loginPage,
    handleLogin,
    handleLogout,
} = require("../controllers/userController");
const {
    validateSignup,
    validateLogin,
} = require("../middlewares/validationMiddleware");

userRouter.get("/signup", signupPage);
userRouter.post("/signup", validateSignup, handleSignup);
userRouter.get("/login", loginPage);
userRouter.post("/login", validateLogin, handleLogin);
userRouter.get("/logout", handleLogout);

module.exports = userRouter;
