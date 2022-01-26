const { User, Post, Comment, Profile } = require("../server/models");

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
        const comments = await Comment.findAll({
            where: { uuid: req.params.uuid },
        });
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
exports.commentDelete = async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: { uuid: req.params.uuid },
        });
        return res.json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.commentUpdate = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        const commentObject = {
            content,
            imageUrl,
        };
        await Comment.update(commentObject, {
            where: { uuid: req.params.uuid },
        });
        return res.json(commentObject);
    } catch (error) {
        res.status(500).json(error);
    }
};
