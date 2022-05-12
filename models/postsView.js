const PostsController = require("../controllers/posts");

class PostsView {
  constructor() {
    document.querySelectorAll("#like-button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        PostsController.UpdateLikes(event.target.className);
      });
    });
  }
}

module.exports = PostsView;
