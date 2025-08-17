const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("node:path");
const pool = require("./config/db");

const userRouter = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const membershipRoutes = require("./routes/membershipRoutes");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Sessions
app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "user_sessions",
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 60 * 1000 }, // 30 minutes session
    })
);

// Make session user available in views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Body parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userRouter);
app.use("/", homeRoutes);
app.use("/messages", messageRoutes);
app.use("/membership", membershipRoutes);

// Start server
app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
});
