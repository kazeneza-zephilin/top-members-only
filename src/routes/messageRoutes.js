const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middlewares/authMiddleware");
const { validateMessage } = require("../middlewares/validationMiddleware");

const {
    createMessage,
    updateMessage,
    renderCreateMessage,
    renderEditMessage
} = require("../controllers/messageController");

router.get("/new", ensureLoggedIn, renderCreateMessage);
router.get("/:id/edit", ensureLoggedIn, renderEditMessage);
router.post("/", ensureLoggedIn,validateMessage, createMessage);
router.post("/:id", ensureLoggedIn,validateMessage, updateMessage);

module.exports = router;
