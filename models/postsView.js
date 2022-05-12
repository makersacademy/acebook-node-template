class PostsView {
  constructor() {
    let likeButton = document.querySelectorAll("#like-button").forEach((btn) =>
      btn.addEventListener("click", () => {
        console.log("Hi");
      })
    );
  }
}

module.exports = PostsView;
