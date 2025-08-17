const pool = require("../config/db");

// Make user a member
async function becomeMember(userId) {
  await pool.query(
    "UPDATE users SET is_member = TRUE WHERE id = $1",
    [userId]
  );
}

//  Check if user is a member
async function checkMembership(userId) {
  const result = await pool.query(
    "SELECT is_member FROM users WHERE id = $1",
    [userId]
  );
  return result.rows[0]?.is_member || false;
}

module.exports = {
  becomeMember,
  checkMembership,
};
