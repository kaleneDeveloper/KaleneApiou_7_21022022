const express = require("express");
const userRoutes = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const path = require("path");

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use(express.json());

app.use("/api/comments", commentRouter);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRouter);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
