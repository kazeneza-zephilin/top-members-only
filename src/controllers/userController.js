const { use } = require('passport')
const pool = require('../config/db')
const bcrypt = require('bcrypt')

const signupPage = (req, res) => {
    res.render('signup', { errors: null, success: null })
}

const handleSignup = async (req, res, next) => {
    try {
        const { first_name, second_name, username, email, password } = req.body
        let errors = null
        let success = null
        if (!first_name || !second_name ||!username || !email || !password) {
            res.render('signup', { errors, success})
            return
        }
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            error = 'User already exists'
            res.render('signup', { errors, success })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query('INSERT INTO users (first_name, second_name, username, email, password) VALUES ($1, $2, $3, $4, $5)', [first_name, second_name, username, email, hashedPassword])
        success = 'User created successfully'
        res.render('signup', { errors, success })
    } catch (error) {
        next(error) //pass error to error handler
        
    }
}

module.exports = { signupPage, handleSignup }
