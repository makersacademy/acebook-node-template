var SignUpController = {
SignUp: function(req, res) {
    res.render('home/signup', { title: 'Acebook' });
}
};

module.exports = SignUpController;
