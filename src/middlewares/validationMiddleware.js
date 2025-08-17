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

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send errors and old input back to create-message view
      return res.render("create-message", { 
        errors: errors.array(),
        oldInput: {
          title: req.body.title,
          message: req.body.message
        }
      });
    }
    next();
  }
];


const validateMembership = [
  body("hint_code")
    .trim()
    .notEmpty().withMessage("Hint code is required")
    .custom((value) => {
      if (value !== "becomeOne") {
        throw new Error("Invalid hint code");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", { 
        errors: errors.array(),
        user: req.user, 
        messages: req.messages 
      });
    }
    next();
  }
];


module.exports = { validateSignup, validateLogin, validateMessage, validateMembership };
