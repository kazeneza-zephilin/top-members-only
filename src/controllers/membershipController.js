const membershipModel = require("../models/membershipModel");
const messageModel = require("../models/messageModel");

async function handleMembership(req, res) {
  const userId = req.session.user.id;

  try {
    // Update user to become member
    await membershipModel.becomeMember(userId);

    // Update session
    req.session.user.is_member = true;

    // Reload homepage messages
    const messages = await messageModel.getAllMessages();
    res.render("index", {
      messages,
      user: req.session.user,
      errors: null,
      success: "Congratulations! You’re now a member."
    });
  } catch (err) {
    // Any unexpected errors
    const messages = await messageModel.getAllMessages();
    res.render("index", {
      messages,
      user: req.session.user,
      errors: [{ msg: err.message }],
      success: null
    });
  }
}

module.exports = { handleMembership };
