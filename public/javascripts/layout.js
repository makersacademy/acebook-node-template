console.log('layout.js');

// this script makes the like button fetch '/posts/like' 
// without being embedded in a form

document.querySelectorAll(".like").forEach((button) => {
  button.addEventListener('click', () => {
    liked(button.value);
  });
})

function liked(postID) {
  const data = { post: postID }
  fetch("/posts/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    // refresh number of likes on like button
    .then(() => { location.reload() });
}
