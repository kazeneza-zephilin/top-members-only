const express = require("express");
const app = express();
const path = require("node:path");
const userRoutes = require("./routes/userRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); // for form data
app.use("/", userRoutes);

app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
});
