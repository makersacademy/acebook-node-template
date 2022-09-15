function likeCommentOnClick(id) {
  console.log(id.toString());
  fetch(`/likes/new/comments/${id}`, { method: "PUT" })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById(`counter-${id}`).textContent = result.counter;
      let likedButtonState = "false"; // // if currently blue, make white
      const likeButtonEl = document.getElementById(`button-${id}`);
      if (likeButtonEl.className.split(" ")[1] === "liked-false")
        // if currently white, make blue
        likedButtonState = "true";
      likeButtonEl.className = `comment-like-button liked-${likedButtonState}`;
    });
}

module.exports = likeCommentOnClick;
