// routes/membershipRoutes.js
const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middlewares/authMiddleware");
const { validateMembership } = require("../middlewares/validationMiddleware");
const { handleMembership } = require("../controllers/membershipController");

router.post("/", ensureLoggedIn, validateMembership, handleMembership);

module.exports = router;

