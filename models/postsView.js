const PostsController = require("../controllers/posts");

class PostsView {
  constructor() {
    document.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        console.dir(event.target.id);

        PostsController.info(event.target.id);
      });
    });
  }
}

module.exports = PostsView;
