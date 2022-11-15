const HomeController = {
  Index: (req, res) => {
    res.render('home/index', { title: 'Kittenbook' })
  }
}

module.exports = HomeController
