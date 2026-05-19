const jwt = require('jsonwebtoken');

const globalMiddleware =
(req, res, next) => {

    const token =
    req.cookies.token;

    if (token) {

        try {

            const user =
            jwt.verify(

                token,

                process.env.JWT_SECRET
            );

            res.locals.user =
            user;

        } catch (err) {

            res.locals.user =
            null;
        }

    } else {

        res.locals.user =
        null;
    }

    next();
};

module.exports = globalMiddleware;