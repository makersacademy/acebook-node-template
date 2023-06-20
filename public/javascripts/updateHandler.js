export const handleUpdateSubmit = () => {
  const updateForms = document.querySelectorAll(".updateForm");

  updateForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const params = new URLSearchParams([...formData.entries()]);

      fetch(event.currentTarget.action, {
        method: event.currentTarget.method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const postMessageElement = document.getElementById(
            `message-${data.post._id}`
          );
          if (postMessageElement) {
            postMessageElement.textContent = data.post.message;
          }

          const modal = document.getElementById(`editModal-${data.post._id}`);
          if (modal) {
            modal.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    });
  });
};

export const handleNewUpdateForm = (newPost) => {
  const updateForm = newPost.querySelector(".updateForm");

  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const params = new URLSearchParams([...formData.entries()]);

      fetch(event.currentTarget.action, {
        method: event.currentTarget.method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => response.json())
        .then((data) => {
          const postMessageElement = document.getElementById(
            `message-${data.post._id}`
          );
          if (postMessageElement) {
            postMessageElement.textContent = data.post.message;
          }

          const modal = document.getElementById(`editModal-${data.post._id}`);
          if (modal) {
            modal.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    });
  }
};
