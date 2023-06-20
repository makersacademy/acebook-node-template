const closeModalsOnClickOutside = () => {
  window.addEventListener("click", (event) => {
    let allModals = document.getElementsByClassName("modal");
    for (let i = 0; i < allModals.length; i++) {
      if (event.target == allModals[i]) {
        allModals[i].style.display = "none";
      }
    }
  });
};

export const handleEditButtonClick = () => {
  let editButtons = document.getElementsByClassName("edit-button");

  for (let i = 0; i < editButtons.length; i++) {
    let btnId = editButtons[i].id;
    let postId = btnId.split("-")[1];
    let currentModal = document.getElementById("editModal-" + postId);

    editButtons[i].onclick = () => {
      currentModal.style.display = "block";
    };

    closeModalsOnClickOutside();
  }
};

export const updateEditModalAndForm = (newPost, postId) => {
  let currentModal = newPost.querySelector(".modal");
  let updateForm = newPost.querySelector(".updateForm");

  if (currentModal && updateForm) {
    currentModal.id = "editModal-" + postId;
    updateForm.action = `/posts/${postId}/update`;

    let editButton = newPost.querySelector(".edit-button");

    if (editButton) {
      editButton.onclick = () => {
        currentModal.style.display = "block";
      };

      closeModalsOnClickOutside();
    }
  }
};
