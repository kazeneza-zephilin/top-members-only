const pool = require("../config/db");
const bcrypt = require("bcrypt");

const signupPage = (req, res) => {
    res.render("signup", { errors: null, success: null });
};

const handleSignup = async (req, res, next) => {
    try {
        const { first_name, second_name, username, email, password } = req.body;
        let errors = null;
        let success = null;
        if (!first_name || !second_name || !username || !email || !password) {
            res.render("signup", { errors, success });
            return;
        }
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (existingUser.rows.length > 0) {
            error = "User already exists";
            res.render("signup", { errors, success });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (first_name, second_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
            [first_name, second_name, username, email, hashedPassword]
        );
        success = "User created successfully";
        res.redirect("/login");
    } catch (error) {
        next(error);
    }
};

const loginPage = (req, res) => {
    res.render("login", { errors: null, success: null });
};
const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let errors = null;
        let success = null;

        // Check if fields are empty
        if (!email || !password) {
            errors = [{ msg: "All fields are required" }];
            return res.render("login", { errors, success });
        }

        // Check if user exists
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        const user = result.rows[0];
        if (!user) {
            errors = [{ msg: "Invalid email or password" }];
            return res.render("login", { errors, success });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors = [{ msg: "Invalid email or password" }];
            return res.render("login", { errors, success });
        }
        //creating session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        req.session.save((err) => {
            if (err) return next(err);
            res.redirect("/");
        });
    } catch (err) {
        next(err);
    }
};
const handleLogout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) return next(err); // If there’s an error destroying the session
            res.redirect("/"); // Redirect to home page after logout
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signupPage,
    loginPage,
    handleLogin,
    handleSignup,
    handleLogout,
};
