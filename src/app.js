const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const app = express();
const path = require("node:path");
const userRoutes = require("./routes/userRoutes");
const pool = require("./config/db");
const userRouter = require("./routes/userRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "user_sessions",
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 2 * 60 * 1000 }, // two minutes session
    })
);
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
}); // global variable

app.use(express.urlencoded({ extended: false })); // for form data

app.use(userRouter);
app.use("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
});
