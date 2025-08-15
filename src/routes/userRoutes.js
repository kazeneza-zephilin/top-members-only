const { Router } = require('express');
const userRouter = Router();
const { signupPage, handleSignup } = require('../controllers/userController');
const { validateSignup } = require('../middlewares/validationMiddleware')

userRouter.get('/signup', signupPage);
userRouter.post('/signup',validateSignup, handleSignup);

module.exports = userRouter;