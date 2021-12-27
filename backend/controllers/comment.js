const { User, Post, Comment, Profile } = require("../models");

exports.findAll = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: ["user", "post"],
        });
        return res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });
        const comments = await Comment.findAll({ where: { userId: user.id } });
        return res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.commentCreate = async (req, res) => {
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
};