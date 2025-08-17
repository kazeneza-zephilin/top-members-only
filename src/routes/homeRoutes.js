// routes/homeRoutes.js
const express = require("express");
const router = express.Router();
const { renderHomePage } = require("../controllers/messageController");

// GET homepage
router.get("/", renderHomePage);

module.exports = router;
