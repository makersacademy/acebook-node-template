const formSubmitHandler = (form, onSuccess) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const params = new URLSearchParams([...formData.entries()]);

    try {
      const response = await fetch(event.currentTarget.action, {
        method: event.currentTarget.method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
};

export const handleUpdateSubmit = () => {
  const updateForms = document.querySelectorAll(".updateForm");

  updateForms.forEach((form) => {
    formSubmitHandler(form, (data) => {
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
    });
  });
};

export const handleNewUpdateForm = (newPost) => {
  const updateForm = newPost.querySelector(".updateForm");

  if (updateForm) {
    formSubmitHandler(updateForm, (data) => {
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
    });
  }
};
