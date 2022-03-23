const Image = require('../models/post')


const ImagesController = {
  All: async (req, res) => {
    try{
      const images = await Image.find({})
      res.render('images/index', {
        images: images
      });
    } catch {
      res.redirect("/")
    }
    
  },
  New: (req, res) => {
    try {
      res.render('images/new', { 
        user: req.session.user._id,
        title: req.body.title
      });
    } catch {
      res.redirect('/images')
      
    }
  },
  Create: async (req, res) => {
    const filename = req.file != null ? req.file.filename : null;
    req.body.likes = 0;
    const image = new Image({
      // title: req.body.title,
      user: req.session.user._id,
      message: req.body.message,
      image: filename,
      posted_by: req.session.user.email,
      likes: req.body.likes      
    })
    // console.log(image)
    try {
      const newImage = await image.save()
      res.redirect("/posts")
    } catch {
      console.log("Ooops something went wrong!")
    }

  }
};

module.exports = ImagesController;
