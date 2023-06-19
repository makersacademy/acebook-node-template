document.addEventListener("DOMContentLoaded", () => {
  const commentForms = document.querySelectorAll(".comment-form");

  commentForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const json = JSON.stringify(Object.fromEntries(formData));
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      fetch(event.currentTarget.action, {
        method: event.currentTarget.method,
        headers: {
          "Content-Type": "application/json",
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
          const postId = formData.get("postId");
          const newComment = document.createElement("li");
          newComment.classList.add("comment-item");
          newComment.innerHTML = data.html;
          const postsList = document.querySelector(`#comments-${postId}`);
          postsList.insertAdjacentElement("afterbegin", newComment);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
});
