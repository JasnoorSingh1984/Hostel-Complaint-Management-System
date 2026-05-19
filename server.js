require('dotenv').config();

const express = require('express');

const path = require('path');

const cookieParser =
require('cookie-parser');

const session =
require('express-session');

const passport =
require('passport');

const connectDB =
require('./config/db');

const pageRoutes =
require('./routes/pageRoutes');

const authRoutes =
require('./routes/authRoutes');

const complaintRoutes =
require('./routes/complaintRoutes');

const globalMiddleware =
require('./middlewares/globalMiddleware');

const app = express();



// Database Connection
connectDB();



// Google Auth
require('./auth/google');



// View Engine
app.set('view engine', 'ejs');



// Static Files
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'uploads')
    )
);



// Body Parser
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());



// Cookie Parser
app.use(cookieParser());



// Session
app.use(session({

    secret:
    process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false
}));



// Passport
app.use(passport.initialize());

app.use(passport.session());



// Global Middleware
app.use(globalMiddleware);



// Routes
app.use('/', pageRoutes);

app.use('/', authRoutes);

app.use('/', complaintRoutes);



// Server
app.listen(3000, () => {

    console.log(
        'Server running on port 3000'
    );
});