const { Router } = require('express');
const userRouter = Router();
const { signupPage, handleSignup, loginPage, handleLogin } = require('../controllers/userController');
const { validateSignup, validateLogin } = require('../middlewares/validationMiddleware')


userRouter.get('/signup', signupPage);
userRouter.post('/signup',validateSignup, handleSignup);
userRouter.get('/login', loginPage);
userRouter.post('/login', validateLogin, handleLogin);

module.exports = userRouter;