const { User, Post, Comment, Profile } = require("../server/models");
const fs = require("fs");

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
        const post = await Post.findAll({
            where: { uuid: req.params.uuid },
            include: ["user"],
        });
        return res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.postCreate = async (req, res) => {
    if (req.files) {
        const { title, content, userUuid } = req.body;
        try {
            const user = await User.findOne({
                where: { uuid: userUuid },
            });
            let imagesUrl = [];
            await req.files.posts.forEach((image) => {
                imagesUrl +=
                    `${req.protocol}://${req.get(
                        "host"
                    )}/images/uploads/posts/${image.filename}` + " + ";
            });
            const post = await Post.create({
                title,
                userId: user.id,
                content,
                imageUrl: imagesUrl.slice(0, -2),
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
exports.updatePost = async (req, res) => {
    if (req.files) {
        const { title, content } = req.body;
        try {
            const post = await Post.findAll({
                where: { uuid: req.params.uuid },
            });
            if (post[0].userId !== req.auth.userId && req.auth.admin !== true) {
                return res
                    .status(401)
                    .json({ error: "Vous n'avez pas les droits" });
            }
            if (post[0].imageUrl !== null) {
                const filename = post[0].imageUrl.split(
                    "/images/uploads/posts/"
                )[1];
                fs.unlink(`./../images/uploads/posts/${filename}`, () => {});
            }
            const postObject = {
                content,
                title,
                imageUrl: `${req.protocol}://${req.get(
                    "host"
                )}/images/uploads/posts/${req.files.posts[0].filename}`,
            };
            await Post.update(postObject, {
                where: { uuid: req.params.uuid },
            });
            return res.send(postObject);
        } catch (error) {
            res.status(500).send({ error });
        }
    } else {
        try {
            const { title, content, imageUrl } = req.body;
            const postObject = {
                content,
                title,
                imageUrl,
            };
            await Post.update(postObject, {
                where: { uuid: req.params.uuid },
            });
            return res.send(postObject);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { uuid: req.params.uuid },
            include: ["comments"],
        });
       
        if (post.userId !== req.auth.userId && req.auth.admin !== true) {
            return res
                .status(401)
                .json({ error: "Vous n'avez pas les droits" });
        }
        if (post.imageUrl !== null) {
            const filename = post.imageUrl.split(" ");
            const result = filename.filter((e) => e && e !== "+");
            result.forEach((filename) => {
                filename = filename.split("/images/uploads/posts/")[1];
                fs.unlink(`./../images/uploads/posts/${filename}`, () => {});
            });
        }
        await Post.destroy({
            where: { uuid: req.params.uuid },
        });
        return res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};
