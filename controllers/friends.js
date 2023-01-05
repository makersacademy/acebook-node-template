const FriendsController = {
    Index: (req, res) => {
      res.render("friends/index", { title: "Furrends", shownavbar:true });
    },
  };
  
  module.exports = FriendsController;