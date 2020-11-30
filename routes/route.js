const router = require("./userRoute");

router.get(".me", auth, async (req, res) =>{
  try {
    const user = await user.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({message: "Error in fetching user"});
  }
});