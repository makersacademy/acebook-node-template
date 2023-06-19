const attachLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.removeEventListener("click", handleLikeButtonClick);
    button.addEventListener("click", handleLikeButtonClick);
  });
};

const handleLikeButtonClick = (event) => {
  event.preventDefault();

  const likeForm = event.target.closest("form");
  const formData = new FormData(likeForm);
  const dataObject = Object.fromEntries(formData);
  const json = JSON.stringify(dataObject);

  fetch(likeForm.action, {
    method: likeForm.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
    .then((data) => {
      const postLikes = likeForm.nextElementSibling;
      postLikes.textContent = `${data.likesCount} likes`;
    })
    .catch((error) => {
      console.error(error);
    });
};

const attachCommentFormListeners = () => {
  const commentForms = document.querySelectorAll(".comment-form");

  commentForms.forEach((form) => {
    form.removeEventListener("submit", handleCommentFormSubmit);
    form.addEventListener("submit", handleCommentFormSubmit);
  });
};

const handleCommentFormSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const dataObject = Object.fromEntries(formData);
  const commentsContainer = event.currentTarget.closest("ul");
  const ulId = commentsContainer.id;
  const postId = ulId.replace("comments-", "");
  dataObject.postId = postId;

  const json = JSON.stringify(dataObject);

  fetch(event.currentTarget.action, {
    method: event.currentTarget.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
    .then((data) => {
      const postId = dataObject.postId;
      const newComment = document.createElement("li");
      newComment.classList.add("comment-item");
      newComment.innerHTML = data.html;
      const postsList = document.querySelector(`#comments-${postId}`);
      postsList.insertAdjacentElement("afterbegin", newComment);
    })
    .catch((error) => {
      console.error(error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  attachLikeButtonListeners();
  attachCommentFormListeners();

  document
    .getElementById("new-post-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      fetch(event.target.action, {
        method: event.target.method,
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then((data) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(data.html, "text/html");
          let likeCount = htmlDocument.querySelector("#like-count");
          console.log(htmlDocument);
          console.log(likeCount);
          likeCount.innerText = "0";
          likeCount.innerText = 0;
          likeCount.value = "0";

          const postComment = htmlDocument.querySelector(".post-comment");
          let fullId = postComment.id;
          let splitId = fullId.split("-");
          let postId = splitId[1];

          const newPost = document.createElement("li");
          newPost.classList.add("post-item");
          newPost.innerHTML = data.html;
          const postsList = document.querySelector(".posts");
          postsList.insertAdjacentElement("afterbegin", newPost);

          const hiddenInput = newPost.querySelector(
            "#like-form input[name='postId']"
          );
          hiddenInput.value = postId;

          attachLikeButtonListeners();
          attachCommentFormListeners();
        })
        .catch((error) => {
          console.error(error);
        });
    });
});
