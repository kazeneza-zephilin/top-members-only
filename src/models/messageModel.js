const pool = require("../config/db");

// Create a message
async function createMessage(user_id, title, message) {
    await pool.query(
        "INSERT INTO messages (user_id, title, message, created_at) VALUES ($1, $2, $3, NOW())",
        [user_id, title, message]
    );
}

// Get all messages with usernames
async function getAllMessages() {
    const result = await pool.query(`
    SELECT m.id, m.title, m.message, m.user_id, m.created_at,
           u.username, u.first_name, u.second_name
    FROM messages m
    JOIN users u ON m.user_id = u.id
    ORDER BY m.created_at DESC
  `);
    return result.rows;
}

// Get a single message by ID
async function getMessageById(id) {
    const result = await pool.query(
        `
    SELECT m.id, m.title, m.message, m.user_id, m.created_at,
           u.username, u.first_name, u.second_name
    FROM messages m
    JOIN users u ON m.user_id = u.id
    WHERE m.id = $1
    `,
        [id]
    );
    return result.rows[0];
}
// Update a message
async function updateMessage(id, title, message) {
    await pool.query(
        "UPDATE messages SET title = $1, message = $2 WHERE id = $3",
        [title, message, id]
    );
}

// Delete a message
async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
};
