const ProfileController = {
  Index: (req, res) => {
    const username = req.session.user.name;
    res.render("profile/userProfile", { name: username, title: "Profile Page"});
  }
}

module.exports = ProfileController