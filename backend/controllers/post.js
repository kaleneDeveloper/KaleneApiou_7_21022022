const { User } = require("../models");
const { Post } = require("../models");
const { Profile } = require("../models");
const { Comment } = require("../models");

exports.findAll = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    include: [
                        {
                            model: Profile,
                            as: "profile",
                        },
                    ],
                },
                {
                    model: Comment,
                    as: "comments",
                    include: [
                        {
                            model: User,
                            as: "user",
                            include: [
                                {
                                    model: Profile,
                                    as: "profile",
                                },
                            ],
                        },
                    ],
                },
            ],
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
            include: ["user"],
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
exports.modifyPost = async (req, res) => {
    if (req.file) {
        const { title, content } = req.body;
        try {
            const post = await Post.findOne({
                where: { uuid: req.params.uuid },
            });
            const filename = post.imageUrl.split("/images/uploads/posts/")[1];
            fs.unlink(`./images/uploads/profile/${filename}`, () => {});
            const postObject = {
                content,
                title,
                imageUrl: `${req.protocol}://${req.get(
                    "host"
                )}/images/uploads/posts/${req.file.filename}`,
            };
            await Post.update(postObject, {
                where: { uuid: req.params.uuid },
            });
            return res.send(post);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        try {
            const { title, content, imageUrl } = req.body;
            const profilObject = {
                title,
                content,
                imageUrl,
            };
            await Profile.update(profilObject, {
                where: { Uuid: req.params.uuid },
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { uuid: req.params.uuid },
        });
        // const filename = post.imageUrl.split("/images/uploads/posts/")[1];
        // fs.unlink(`./images/uploads/posts/${filename}`, () => {});
        await Post.destroy({
            where: { uuid: req.params.uuid },
        });
        return res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};
