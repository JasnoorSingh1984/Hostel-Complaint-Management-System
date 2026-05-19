const express =
require('express');

const router =
express.Router();

const passport =
require('passport');

const authController =
require(
'../controllers/authController'
);

const upload =
require(
'../utils/multer'
);

const authMiddleware =
require(
'../middlewares/authMiddleware'
);



// Signup
router.post(

    '/signup',

    upload.single(
        'profilePic'
    ),

    authController.signup
);



// Signin
router.post(
    '/signin',
    authController.signin
);



// Logout
router.get(
    '/logout',
    authController.logout
);



// Delete User
router.post(

    '/delete-user',

    authMiddleware,

    authController.deleteUser
);



// Google Login
router.get(

    '/auth/google',

    passport.authenticate(
        'google',
        {
            scope: [
                'profile',
                'email'
            ]
        }
    )
);



// Google Callback
router.get(

    '/auth/google/callback',

    passport.authenticate(
        'google',
        {
            failureRedirect:
            '/signin',

            successRedirect:
            '/profile'
        }
    )
);



// Profile
router.get(
    '/profile',
    authController.profile
);

module.exports =
router;