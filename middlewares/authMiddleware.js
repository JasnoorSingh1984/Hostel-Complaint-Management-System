const jwt = require('jsonwebtoken');

const authMiddleware =
(req, res, next) => {

    const token =
    req.cookies.token;

    if (!token) {

        return res.redirect(
            '/signin'
        );
    }

    try {

        const verified =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (err) {

        return res.redirect(
            '/signin'
        );
    }
};

module.exports = authMiddleware;