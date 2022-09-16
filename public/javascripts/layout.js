// this script makes the like button fetch '/posts/like'
// without being embedded in a form

// const hideBtn = document.querySelectorAll(".hide_show");

document.querySelectorAll(".hide_show").forEach((button) => {
  button.addEventListener("click", () => {
    hideComment();
  });
});

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

function hideComment() {
  let commentHide = document.querySelectorAll(".messageSender__top_comment");
  console.log(commentHide);

  for (let i = 0; i < commentHide.length; i++) {
    console.log(commentHide[i]);

    commentHide[i].classList.toggle("hide");
  }
}
