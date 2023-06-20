export const handleUpdateSubmit = () => {
  const updateForms = document.querySelectorAll(".updateForm");

  updateForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
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
  });
};

export const handleNewUpdateForm = (newPost) => {
  const updateForm = newPost.querySelector(".updateForm");

  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(updateForm);
      fetch(updateForm.action, {
        method: "POST",
        body: formData,
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
