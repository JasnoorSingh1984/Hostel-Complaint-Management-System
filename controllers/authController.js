const User =
require('../models/User');

const bcrypt =
require('bcrypt');

const jwt =
require('jsonwebtoken');

const fs =
require('fs');

const path =
require('path');



// ======================
// SIGNUP
// ======================

exports.signup =
async (req, res) => {

    const {
        full_name,
        email,
        password
    } = req.body;

    try {

        // Check existing user
        const existingUser =
        await User.findOne({
            email
        });

        if (existingUser) {

            return res.redirect(
                '/signin'
            );
        }



        // Hash Password
        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );



        // Create User
        const newUser =
        new User({

            fullName:
            full_name,

            email,

            password:
            hashedPassword,

            profilePic:
            req.file
            ? req.file.filename
            : null
        });



        // Save User
        const savedUser =
        await newUser.save();



        // JWT Token
        const token =
        jwt.sign(

            {
                id:
                savedUser._id
                .toString(),

                email:
                savedUser.email,

                full_name:
                savedUser.fullName,

                profilePic:
                savedUser.profilePic
            },

            process.env
            .JWT_SECRET,

            {
                expiresIn:
                '1h'
            }
        );



        // Save Cookie
        res.cookie(
            'token',
            token,
            {
                httpOnly: true,

                secure: true,

                sameSite: 'none'
            }
        );



        res.redirect('/');

    } catch (error) {

        console.log(error);

        res.redirect('/signin');
    }
};



// ======================
// SIGNIN
// ======================

exports.signin =
async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        // Find User
        const user =
        await User.findOne({
            email
        });



        // Check Password
        if (

            user &&

            await bcrypt.compare(
                password,
                user.password
            )
        ) {

            // JWT Token
            const token =
            jwt.sign(

                {
                    id:
                    user._id
                    .toString(),

                    email:
                    user.email,

                    full_name:
                    user.fullName,

                    profilePic:
                    user.profilePic
                },

                process.env
                .JWT_SECRET,

                {
                    expiresIn:
                    '1h'
                }
            );



            // Save Cookie
            res.cookie(
                'token',
                token,
                {
                    httpOnly: true,

                    secure: true,

                    sameSite: 'none'
                }
            );



            return res.redirect('/');
        }



        res.redirect('/signin');

    } catch (error) {

        console.log(error);

        res.redirect('/signin');
    }
};



// ======================
// LOGOUT
// ======================

exports.logout =
(req, res) => {

    res.clearCookie(
        'token',
        {
            httpOnly: true,

            secure: true,

            sameSite: 'none'
        }
    );

    res.redirect('/');
};



// ======================
// DELETE USER
// ======================

exports.deleteUser =
async (req, res) => {

    try {

        // Find User
        const user =
        await User.findById(
            req.user.id
        );



        // Delete Profile Picture
        if (
            user.profilePic
        ) {

            const filePath =
            path.join(

                __dirname,

                '..',

                'uploads',

                user.profilePic
            );



            // Check File Exists
            if (
                fs.existsSync(
                    filePath
                )
            ) {

                // Delete File
                fs.unlinkSync(
                    filePath
                );

                console.log(
                    'Profile picture deleted'
                );
            }
        }



        // Delete User
        await User.findByIdAndDelete(
            req.user.id
        );



        // Clear JWT Cookie
        res.clearCookie(
            'token',
            {
                httpOnly: true,

                secure: true,

                sameSite: 'none'
            }
        );



        res.redirect('/');

    } catch (error) {

        console.log(error);

        res.redirect('/');
    }
};



// ======================
// GOOGLE PROFILE
// ======================

exports.profile =
(req, res) => {

    if (!req.user) {

        return res.redirect(
            '/signin'
        );
    }



    // JWT Token
    const token =
    jwt.sign(

        {
            id:
            req.user._id
            .toString(),

            email:
            req.user.email,

            full_name:
            req.user.fullName,

            profilePic:
            req.user.profilePic
        },

        process.env
        .JWT_SECRET,

        {
            expiresIn:
            '1h'
        }
    );



    // Save Cookie
    res.cookie(
        'token',
        token,
        {
            httpOnly: true,

            secure: true,

            sameSite: 'none'
        }
    );



    res.redirect('/');
};