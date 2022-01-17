const { User } = require("../server/models");
const { Profile } = require("../server/models");
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
            include: ["profile"],
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
            include: ["profile"],
        });
        return res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.updateProfile = async (req, res) => {
    if (req.file) {
        const { username, lastName, age, email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { uuid: req.params.uuid },
                include: ["profile"],
            });
            const filename = user.profile[0].imageUrl.split(
                "/images/uploads/profile/"
            )[1];
            console.log(filename + "test");
            fs.unlink(`./images/uploads/profile/${filename}`, () => {});
            const profilObject = {
                username,
                lastName,
                age,
                email,
                password,
                imageUrl: `${req.protocol}://${req.get(
                    "host"
                )}/images/uploads/profile/${req.file.filename}`,
            };
            await Profile.update(profilObject, {
                where: { userUuid: req.params.uuid },
            });
            return res.send(profilObject);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        try {
            const { username, lastName, age, email, password, imageUrl } =
                req.body;
            const profileObject = {
                username,
                lastName,
                age,
                email,
                password,
                imageUrl,
            };
            await Profile.update(profileObject, {
                where: { userUuid: req.params.uuid },
            });
            return res.send(profileObject);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
exports.getToken = async (req, res) => {
    res.send(req.auth);
};
