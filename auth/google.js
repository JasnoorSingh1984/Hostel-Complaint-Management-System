const passport = require('passport');

require('dotenv').config();

const GoogleStrategy =
require('passport-google-oauth20').Strategy;

const User =
require('../models/User');



// Google OAuth Strategy
passport.use(

    new GoogleStrategy(

        {
            clientID:
            process.env.GOOGLE_CLIENT_ID,

            clientSecret:
            process.env.GOOGLE_CLIENT_SECRET,

            callbackURL:
            process.env.CALLBACK_URL
        },

        async function (
            accessToken,
            refreshToken,
            profile,
            cb
        ) {

            try {

                // Check if user exists
                let user =
                await User.findOne({

                    email:
                    profile.emails[0].value
                });

                if (user) {

                    return cb(null, user);

                } else {

                    // Create new user
                    const newUser =
                    new User({

                        fullName:
                        profile.displayName,

                        email:
                        profile.emails[0].value,

                        password:
                        'google_oauth_user'
                    });

                    const savedUser =
                    await newUser.save();

                    return cb(
                        null,
                        savedUser
                    );
                }

            } catch (error) {

                return cb(
                    error,
                    null
                );
            }
        }
    )
);



// Serialize User
passport.serializeUser(
function(user, done) {

    done(null, user._id);
});



// Deserialize User
passport.deserializeUser(
async function(id, done) {

    try {

        const user =
        await User.findById(id);

        done(null, user);

    } catch (error) {

        done(error, null);
    }
});