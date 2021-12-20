const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Auth failed" });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, authData) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.auth = authData;
        next();
    });
};
