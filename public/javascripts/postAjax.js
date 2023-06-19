// Function to add event listeners to comment forms
const attachCommentFormListeners = () => {
  const commentForms = document.querySelectorAll(".comment-form");
  console.log(commentForms);

  commentForms.forEach((form) => {
    form.removeEventListener("submit", handleCommentFormSubmit);
    form.addEventListener("submit", handleCommentFormSubmit);
  });
};

// Function to handle comment form submission
const handleCommentFormSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const dataObject = Object.fromEntries(formData);
  const commentsContainer = event.currentTarget.closest("ul");
  console.log(commentsContainer);

  const ulId = commentsContainer.id;
  console.log(ulId);

  const postId = ulId.replace("comments-", "");
  dataObject.postId = postId;

  console.log(postId);
  console.log(dataObject);

  const json = JSON.stringify(dataObject);
  console.log(json);

  fetch(event.currentTarget.action, {
    method: event.currentTarget.method,
    headers: {
      Accept: "application/json",
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
      console.log(data.headers.get("Content-Type"));
      console.log(data.headers.get("Accept"));
      data.text().then((text) => console.log(text));
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

// Attach event listeners when document is ready
document.addEventListener("DOMContentLoaded", () => {
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
          const newPost = document.createElement("li");
          newPost.classList.add("post-item");
          newPost.innerHTML = data.html;
          const postsList = document.querySelector(".posts");
          postsList.insertAdjacentElement("afterbegin", newPost);

          attachCommentFormListeners();
        })
        .catch((error) => {
          console.error(error);
        });
    });
});
