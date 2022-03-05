const { User, Post, Comment, Profile } = require("../server/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config({ encoding: "latin1" });

exports.signup = async (req, res) => {
    const { username, admin, email } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const findUsername = await User.findOne({ where: { username } });

    await User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                return res
                    .status(401)
                    .send({ message: "Email already exists" });
            }
            if (findUsername) {
                if (username === findUsername.username) {
                    return res
                        .status(401)
                        .send({ message: "Username already exists" });
                }
            }
            User.create({ username, admin, password, email }).then((user) => {
                Profile.create({
                    userId: user.id,
                    userUuid: user.uuid,
                    username,
                    email,
                    password,
                });
                return res.status(201).send(user);
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
exports.login = async (req, res) => {
    const { password, email } = req.body;
    await User.findOne({ where: { email } })
        .then((user) => {
            if (!user) {
                return res.status(401).send({ message: "Wrong email" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({ message: "Wrong password" });
            }
            const token = jwt.sign(
                {
                    userId: user.id,
                    uuid: user.uuid,
                    email: user.email,
                    admin: user.admin,
                },
                process.env.TOKEN_KEY,
                { expiresIn: "24h" }
            );
            return res.status(200).send({
                token: token,
                userId: user.id,
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                "profile",
                {
                    model: Post,
                    as: "posts",
                    include: ["comments"],
                },
            ],
        });
        return res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
            include: [
                "profile",
                {
                    model: Post,
                    as: "posts",
                    include: ["comments"],
                },
            ],
        });
        return res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.updateProfile = async (req, res) => {
    if (req.files.profile !== undefined) {
        const { username, lastName, age, email } = req.body;
        const password = bcrypt.hashSync(req.body.password, 10);
        try {
            await User.findOne({ where: { username: username } })
                .then((user) => {
                    if (
                        (user && user.username !== username) ||
                        (user && user.email !== email)
                    ) {
                        return res.status(401).send({
                            message: "Username or email already exists",
                        });
                    }
                    const profile = Profile.findAll({
                        where: { userUuid: req.params.uuid },
                    });
                    const filename = profile[0].imageUrl.split(
                        "/images/uploads/profiles/"
                    )[1];
                    fs.unlink(
                        `./../images/uploads/profiles/${filename}`,
                        () => {}
                    );
                    const profilObject = {
                        username,
                        lastName,
                        age,
                        email,
                        password,
                        imageUrl: `${req.protocol}://${req.get(
                            "host"
                        )}/images/uploads/profiles/${
                            req.files.profile[0].filename
                        }`,
                    };
                    Profile.update(profilObject, {
                        where: { userUuid: req.params.uuid },
                    });
                    User.update(profilObject, {
                        where: { userUuid: req.params.uuid },
                    });
                    return res.send(profilObject);
                })
                .catch((error) => res.status(500).json({ error }));
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        try {
            const { username, lastName, age, email, imageUrl } = req.body;
            const password = bcrypt.hashSync(req.body.password, 10);
            const profileObject = {
                username,
                lastName,
                age,
                email,
                password,
                imageUrl,
            };
            await User.findOne({ where: { username: username } }).then(
                (user) => {
                    console.log(user.email);
                    if (
                        (user && user.username !== username) ||
                        (user && user.email !== email)
                    ) {
                        return res.status(401).send({
                            message: "Username or email already exists",
                        });
                    }

                    Profile.update(profileObject, {
                        where: { userUuid: req.params.uuid },
                    });
                    User.update(profileObject, {
                        where: { uuid: req.params.uuid },
                    });
                    return res.send(profileObject);
                }
            );
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
exports.getToken = async (req, res) => {
    res.send(req.auth);
};
exports.delete = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.params.uuid } });
        const profile = await Profile.findOne({
            where: { userUuid: req.params.uuid },
        });
        const filename = profile.imageUrl.split("/images/uploads/profiles/")[1];
        fs.unlink(`./../images/uploads/profiles/${filename}`, () => {});
        await user.destroy();
        await profile.destroy();
        return res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
