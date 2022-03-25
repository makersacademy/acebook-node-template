const HomeController = {
  Index: (req, res) => {



    res.json({message:"This route works"})
    
    // ("home/index", { title: "Maker Mate", user: req.session.user});


  },
};

module.exports = HomeController;
