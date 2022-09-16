// this script makes the like button fetch '/posts/like'
// without being embedded in a form

document.querySelectorAll(".like").forEach((button) => {
  button.addEventListener("click", () => {
    liked(button.value);
  });
});

function liked(postID) {
  let button = document.querySelector(`#button${postID}`);

  fetch("/posts/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post: postID }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.liked === false) {
        likeIncrement(button);
      } else {
        likeDecrement(button);
      }
    });
}

const likeIncrement = (button) => {
  let likeCount = document.querySelector(`#like${button.value}`);
  likeCount.textContent = parseInt(likeCount.textContent) + 1;
  button.style.color = "#F47983";
};

const likeDecrement = (button) => {
  let likeCount = document.querySelector(`#like${button.value}`);
  likeCount.textContent = parseInt(likeCount.textContent) - 1;
  button.style.color = "gray";
};
