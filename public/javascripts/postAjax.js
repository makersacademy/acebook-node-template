document.addEventListener("DOMContentLoaded", () => {
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
          console.log(data);
          const newPost = document.createElement("li");
          newPost.classList.add("post-item");
          newPost.innerHTML = data.html;
          const postsList = document.querySelector(".posts");
          postsList.insertAdjacentElement("afterbegin", newPost);
        })
        .catch((error) => {
          console.error(error);
        });
    });
});
