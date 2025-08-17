// controllers/messageController.js
const messageModel = require("../models/messageModel");

async function renderHomePage(req, res) {
  try {
    const messages = await messageModel.getAllMessages();
    res.render("index", { messages, errors: [], success: null }); // pass messages to EJS
  } catch (err) {
    console.error("Error loading homepage:", err);
    res.status(500).send("Server error");
  }
}

// Create new message (only for logged-in users)
async function createMessage(req, res) {
  try {
    const user_id = req.session.user.id;
    const { title, message } = req.body;
    await messageModel.createMessage(user_id, title, message);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Update existing message (only owner)
async function updateMessage(req, res) {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    // fetch message to check ownership
    const msg = await messageModel.getMessageById(id);
    if (!msg) return res.status(404).send("Message not found");
    if (msg.user_id !== req.session.user.id)
      return res.status(403).send("You can only edit your own messages");

    await messageModel.updateMessage(id, title, message);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// controllers/messageController.js
function renderCreateMessage(req, res) {
  // If the route is accessed normally, no errors or old input exist
  res.render("create-message", {
    errors: [],      // empty array for validation errors
    oldInput: {}     // empty object for old input fields
  });
}

async function renderEditMessage(req, res) {
  try {
    const { id } = req.params;
    const msg = await messageModel.getMessageById(id);

    if (!msg) return res.status(404).send("Message not found");
    if (msg.user_id !== req.session.user.id)
      return res.status(403).send("You can only edit your own messages");

    res.render("edit-message", { message: msg, errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}


module.exports = { renderHomePage, createMessage, updateMessage, renderCreateMessage, renderEditMessage };
