const pool = require("../config/db");

async function createUser(first_name, second_name, username, email, password) {
    await pool.query(
        "INSERT INTO users (first_name, second_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
        [first_name, second_name, username, email, password]
    );
}
async function getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}
async function getUserByemail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [
        email,
    ]);
    return result.rows[0];
}

module.exports = { createUser, getAllUsers, getUserByemail };
