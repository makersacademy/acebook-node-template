// this script makes the like button fetch '/posts/like' 
// without being embedded in a form

document.querySelectorAll(".like").forEach((button) => {
  button.addEventListener('click', () => {
    liked(button.value);
    button.style.color = "#1877f2"
    likeCounter(button)
  });
})

function liked(postID) {
  fetch("/posts/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post: postID })
  })
    // refresh number of likes on like button
    // .then(() => { window.location.reload() })
    .then((res)=> res.json())
    .then((res) => console.log(res));
}

const likeCounter = (button) => {
  let likeCount = document.querySelector(`#like${button.value}`)
  likeCount.textContent = parseInt(likeCount.textContent) + 1
}