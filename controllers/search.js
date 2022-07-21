const SearchController = {
  Index: (req, res) => {
    console.log(`link working: ${req.params}`)
    console.log(req.body)
    console.log(req)
    res.render('search/index');
  },
}

module.exports = SearchController;