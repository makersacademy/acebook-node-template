document.querySelectorAll("#comment-btn").forEach((button) => {
  let postId = button.getAttribute("postID");
  let divId = "#comment-" + postId;

  let commentDiv = document.querySelector(divId);

  button.addEventListener("click", () => {
    if (commentDiv.style.display === "none") {
      commentDiv.style.display = "block";
    } else {
      commentDiv.style.display = "none";
    }
  });
});
console.log("hello");
