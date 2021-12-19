const { User } = require("../models");
const { Post } = require("../models");

exports.findAll = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: ["user"]
        });
        return res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });
        const post = await Post.findAll({
            where: { userId: user.id },
        });
        return res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.postCreate = async (req, res) => {
    if (req.file) {
        const { title, content, userUuid } = req.body;
        try {
            const user = await User.findOne({
                where: { uuid: userUuid },
            });
            const post = await Post.create({
                title,
                userId: user.id,
                content,
                imageUrl: `${req.protocol}://${req.get(
                    "host"
                )}/images/uploads/posts/${req.file.filename}`,
            });
            return res.send(post);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        const { title, content, imageUrl, userUuid } = req.body;
        try {
            const user = await User.findOne({
                where: { uuid: userUuid },
            });
            const post = await Post.create({
                title,
                userId: user.id,
                content,
                imageUrl,
            });
            return res.send(post);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
