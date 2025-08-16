const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("first_name")
    .trim()
    .notEmpty().withMessage("First name is required"),

  body("second_name")
    .trim()
    .notEmpty().withMessage("Second name is required"),
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email address"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  body("verify_password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", { 
        errors: errors.array(),
        success: null 
      });
    }
    next();
  }
];

const validateLogin = [
  body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", { 
        errors: errors.array(), 
        success: null 
      });
    }
    next();
  }
];


module.exports = { validateSignup, validateLogin };
