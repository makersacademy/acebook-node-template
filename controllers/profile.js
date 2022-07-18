const ProfileController = {
  Index: (req, res) => {
    res.render("profile/userProfile", { title: "Profile Page"});
  }
}

module.exports = ProfileController