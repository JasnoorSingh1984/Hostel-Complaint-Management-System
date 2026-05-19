exports.home = (req, res) => {

    res.render('index', {
        title: 'HOME'
    });
};

exports.about = (req, res) => {

    res.render('about', {
        title: 'ABOUT'
    });
};

exports.signinPage = (req, res) => {

    res.render('signin');
};