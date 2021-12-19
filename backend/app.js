const express = require("express");
const { sequelize, User, Post, Comment } = require("./models");
const userRoutes = require("./routes/user");
const postRouter = require("./routes/post");
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

app.get("/comments", async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: ["user", "post"],
        });
        return res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/comments/:uuid", async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });
        const comments = await Comment.findAll({ where: { userId: user.id } });
        return res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post("/comment", async (req, res) => {
    const { postUuid, content, userUuid, imageUrl } = req.body;
    try {
        const user = await User.findOne({
            where: { uuid: userUuid },
        });
        const post = await Post.findOne({
            where: { uuid: postUuid },
        });
        const comment = await Comment.create({
            content,
            postId: post.id,
            userId: user.id,
            imageUrl,
        });
        return res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRouter);
app.use("/api/users", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
